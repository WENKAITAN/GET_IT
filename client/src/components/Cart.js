import React from "react";
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import CartItem from "./CartItem";
function Cart ( {itemdelete, updateQuantity} ) {
    
    let bags = JSON.parse(localStorage.getItem("cart"));
    const removeItem = (id) =>{
        itemdelete(id)
    }
    const checkout = async (e) => {
        e.preventDefault();
        let items = JSON.parse(localStorage.getItem("cart"));
        let email = JSON.parse(localStorage.getItem("email"));
        let line_items = [];
        Object.keys(items).forEach((key) => {
            const item = items[key];
            line_items.push(item);
        })
        fetch("/api/create-checkout-session", {
            method: 'POST',
            headers: {
              "Content-Type": 'application/json'
            },
            body: JSON.stringify({line_items, email})
          }).then(res => res.json())
          .then(body => {
            window.location.href = body.url;
          })
    }
    return(
        <Container ClassName="carttesting">
            
            <Row className="horizontal">
                
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Row className="all-description">
                        <Col className="description" xs={6} md={4}>
                            <Card.Title style={{fontSize:'30px', fontWeight:'600'}}>Description</Card.Title>
                        </Col>

                        <Col  className="quantity" xs={6} md={4}>
                            <Card.Title style={{fontSize:'30px', fontWeight:'600', textAlign:'center'}}>Quantity</Card.Title>
                        </Col>
                        <Col className="price" xs={6} md={4}>
                            <Card.Title style={{fontSize:'30px', fontWeight:'600',float:'right'}}>price</Card.Title>
                        </Col>
                    </Row>
                        <hr bold="200"/>
                    
                    {bags && Object.keys(bags).map(( key ) => (
                    <CartItem key={key} itemInfo={bags[key]} deleteItem={removeItem}/>
                    // <div>{JSON.stringify(bags[key])}</div>
                    ))}
                
                </Card.Body>
            </Card> 
            <Card body style={{ width: '100%' }}>
                {/* <Card.Text style={{textAlign:'right', fontSize:'30px', fontWeight:'600' }}>${totalAmount}</Card.Text> */}
                <Button onClick={(e) => checkout(e)}variant="secondary" size="lg" type="submit" style={{background:'#000000',color:'#FFFFFF', float:'right' }}>
                    CheckOut
                </Button>
            </Card>
            
            </Row>
        </Container>
    )
    
}
export default Cart;