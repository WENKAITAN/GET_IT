import React from "react";
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import CartItem from "./CartItem";

function Cart ( {items, cart, itemdelete, updateQuantity} ) {
    
    let bags = JSON.parse(localStorage.getItem("cart"));
    const removeItem = (id) =>{
        itemdelete(id)
    }
        return(
            <Container>
                
                <Row className="horizontal">
                 
                <Card style={{ width: '100%' }}>
                    <Card.Body>
                        <Row>
                            <Col xs={6} md={4}>
                                <Card.Title style={{fontSize:'30px', fontWeight:'600'}}>Description</Card.Title>
                            </Col>
                            <Col xs={6} md={4}>
                                <Card.Title style={{fontSize:'30px', fontWeight:'600', textAlign:'center'}}>Quantity</Card.Title>
                            </Col>
                            <Col xs={6} md={4}>
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
                    <div style={{float:'right'}}>

                    <Card.Text style={{textAlign:'right',marginTop:'45px'}}> SubTotal</Card.Text>
                    </div>
                </Card>
                <Card body style={{ width: '100%' }}>
                    {/* <Card.Text style={{textAlign:'right', fontSize:'30px', fontWeight:'600' }}>${totalAmount}</Card.Text> */}
                    <div style={{}}>
                    <Button variant="secondary" size="lg" type="submit" style={{background:'#000000',color:'#FFFFFF', float:'right' }}>
                        CheckOut
                    </Button>
                    </div>
                </Card>
                
                </Row>
            </Container>
        )
    
}
export default Cart;