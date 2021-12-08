import React from 'react';
import {Row, Col, Card, Button} from 'react-bootstrap';
class CartItem extends React.Component {
    state = {
        item: {}
    }
    removeItem = (e) => {
        this.props.deleteItem(`${this.props.itemInfo.id}-${this.props.itemInfo.size}`);
    }


    handleChange = (e) => {
        console.log(e.target)
        this.setState({
            item:{ 
                ...this.state.item,
                quantity: e.target.value
            }
        })
        let key = `${this.props.itemInfo.id}-${this.props.itemInfo.size}`;
        let history = JSON.parse(localStorage.getItem("cart"));
        history[key].quantity = e.target.value;
        localStorage.setItem("cart", JSON.stringify(history))
    }

    updateSize = (e) => {
        this.setState({
            item:{ 
                ...this.state.item,
                size: e.target.value.toString(),
            }
        })
        let key = `${this.props.itemInfo.id}-${this.props.itemInfo.size}`;
        let history = JSON.parse(localStorage.getItem("cart"));
        history[key].size = e.target.value;
        localStorage.setItem("cart", JSON.stringify(history))
    }

    componentDidMount(){
        fetch(`http://localhost:5000/product/${this.props.itemInfo.id}`)
        .then(res => res.json())
        .then(item => {
            this.setState({
                item: {
                    ...item,
                    ...this.props.itemInfo
                }
            })
        })
    }
    render(){
        const {item} = this.state
        return(
            <Row>
                            
            <Col className="flex"  xs={8} md={4}>
                    <Card.Img   variant="top" src={item['imageLink']} style={{width: '140px'}} />  
                <Col style={{marginTop: '50px', width:"200ox"}} >
                    <Card.Title className="cartTitle" ><b>{item['name']}</b></Card.Title>
                    
                    <div style={{display:"flex"}}>
                        <select style={{width:"45px" ,height:"25px"}} value={item.size} onChange = {(e) => this.updateSize(e)} name="size">
                            <option value="xxs">xxs</option>
                            <option value="xs">xs</option>
                            <option value="s">s</option>
                            <option value="m">m</option>
                            <option value="l">l</option>
                            <option value="xl">xl</option>
                            <option value="xxl">xxl</option>
                        </select>

                        <input class="media-quantity" style={{width:"45px" ,height:"25px"}} type="number" onChange={(e) => this.handleChange(e)} value={item.quantity} name="quantity" min="1" />
                    <div class="media-remove">
                        <Button onClick={(e) => this.removeItem(e)} > remove </Button>
                    </div>
                    </div>
                </Col>
                
            </Col>
            
                <Col xs={12} md={4}>
                    <input  className="full-quantity" style={{transform: "translate(450%, 50%)",marginTop: '50px',width:'40px'}} type="number" onChange={(e) => this.handleChange(e)} value={item.quantity} name="quantity" min="1" />
                </Col>


                
                <Col xs={12} md={4}>
                    <Card.Text  style={{fontSize:'20px', fontWeight:'600',float:'right',marginTop: '50px'}}>${item.price * item.quantity}</Card.Text>
                </Col>
            
            </Row>
        )
    }
}

export default CartItem;