import React, { Component, useState, useEffect } from "react";
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import ItemDetail from "./ItemDetail";


function Cart ( {items, cart, itemdelete, updateQuantity} ) {
    
        const [totalAmount, setTotalAmount] = useState(0);
        const [cartItems, setCartItems] = useState([]);
        const [carts, setCarts] = useState([]); 
        
        useEffect (() =>{
            let totalPrice = 0;
            let items_in_cart = [];
            let quantities = [];

            for(let i = 0; i < cart.length; i++) {
                const item = items[cart[i].id];
                const itemInfo = {
                    ...item,
                    size: cart[i].size,
                    quantity: cart[i].quantity,
                }
                items_in_cart[i]=itemInfo
                let id_quantity = {}
                id_quantity[cart[i].id] = parseInt(cart[i].quantity)
                quantities[i]=id_quantity
                // totalPrice += (parseInt(item['price']) * parseInt(itemInfo['quantity']));
                
            }
            setTotalAmount(totalPrice);
            setCartItems(items_in_cart);
            setCarts(cart)
    }, [items, cart])
    
    const removeItem = (id , e) =>{
        itemdelete(id)
    }

    const handleChange = (id ,e ) =>{
        let x = carts.find((item) => item.id === id); 
        let changedItem = cartItems.find((item) => item.id === id);
        
        changedItem.quantity = e.target.value;
        x.quantity = e.target.value;
        
        setCartItems(cartItems)
        
        setCarts([
            ...carts.filter((item) => item.id !== id),
            x
        ])
        
    }

    const handleUpdate = (e, id) => {
        let changedItem = cartItems.find((item) => item.id === id);
        let quantity = changedItem["quantity"];
        
        updateQuantity(id, quantity)
        
    }

    const itemprice = (id) =>{
        
        let changedItem = cartItems.find((item) => item.id === id);
        let quantity = changedItem["quantity"]
        return (changedItem["price"] * quantity)  
        
    }


    useEffect (() =>{
        let arr=[];
        let totalPrice = 0;
        for(let i=0 ; i<cartItems.length; i++){
            const item = cartItems[i].price;
            const quan = cartItems[i].quantity;
            arr.push(item * quan)
        }
        
        if(arr.length !== 0){
            const reducer = (previousValue, currentValue) => previousValue + currentValue;
            totalPrice=arr.reduce(reducer)
        }
    
        setTotalAmount(totalPrice)
    })

    console.log(cart)
        
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
                        
                        {cartItems.map( ( item ) => (
                        <Row>
                        
                            <Col className="flex"  xs={6} md={4}>
                                    <Card.Img variant="top" src={item['imageLink']} style={{width: '10rem'}}/>
                                <Col style={{marginTop: '50px'}} >
                                    <Card.Title ><b>{item['name']}</b></Card.Title>
                                    <Card.Text> {item["size"]} </Card.Text>
                                    <Button onClick={(e) => removeItem(item.id , e)}> remove </Button>
                                    <Button type="submit" onClick={(e) => handleUpdate(e, item.id)}style={{background:'#FFFFFF',color:'#000000', fontWeight:'500'}}>
                                        Update
                                    </Button>
                                </Col>
                                
                            </Col>
                                
                                <Col xs={6} md={4}>
                                    <input style={{marginLeft:'180px',marginTop: '50px',width:'40px'}} type="number" onChange={(e) => handleChange(item.id, e)} value={item.quantity} name="quantity" min="1" />
                                </Col>
                                
                                <Col xs={6} md={4}>
                                    <Card.Text style={{fontSize:'20px', fontWeight:'600',float:'right',marginTop: '50px'}}>${itemprice(item.id)}</Card.Text>
                                </Col>
                            
                            </Row>
                        ))}
                    
                    </Card.Body>
                </Card> 
                 
                <Card body style={{ width: '100%' }}>
                    <div style={{float:'right'}}>

                    <Card.Text style={{textAlign:'right',marginTop:'45px'}}> SubTotal</Card.Text>
                    </div>
                </Card>
                <Card body style={{ width: '100%' }}>
                    <Card.Text style={{textAlign:'right', fontSize:'30px', fontWeight:'600' }}>${totalAmount}</Card.Text>
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