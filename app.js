const { sequelize, User, Product, Order } = require('./models')
const db = require('./models');
const express = require('express');
const expressSession = require('express-session');
const flash = require('connect-flash');
const passport = require('./middlewares/authentication');
const index = require('./routes/index');
const user = require('./routes/user');
const product = require('./routes/product');
const auth = require('./auth');
const cors = require('cors')
var morgan = require('morgan')
const app = express();
const port = process.env.PORT || 8000;
if(process.env.NODE_ENV === 'production'){
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    req.sendFile(path.resolve(__dirname, "build", "index.html"))
  })
}
app.use(express.json());
app.use(flash());
app.use(morgan('combined'))
// setup passport and session cookies
app.use(expressSession({
    secret: "keyboard_cat",
    resave: false,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());
const issue2options = {
origin: "http://localhost:3000",
methods: ["GET","POST","PATCH","PUT"],
credentials: true,
maxAge: 3600
};
app.use(cors(issue2options));
// app.use(flash())
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')

app.use('/', index);
app.use('/user', user);
app.use('/product', product);
app.use('/auth', auth);

app.post('/create-checkout-session', async (req, res) => {
  const {line_items, email}  = req.body;
  // console.log(line_items);
  let products = [];
  for (let i = 0; i < line_items.length; i++) {
    const item = line_items[i];
    let product = {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price*100,
      },
      quantity: parseInt(item.quantity),
    }
    products.push(product)
  }
  const session = await stripe.checkout.sessions.create({
    line_items: products,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });

  res.json({url: session.url});
});


// error handler
app.use(function(err, req, res, next) {
  
    // render the error page
    res.status(err.status || 500);
    return res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {},
        flashMessage: req.flash("error")
    })
  });

app.listen(port, async() => {
    console.log('Server up on http://localhost:5000');
    await sequelize.authenticate();
    console.log("Database connected")
})