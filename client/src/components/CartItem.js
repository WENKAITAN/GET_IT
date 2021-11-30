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
        this.setState({
            item:{ 
                ...this.state.item,
                quantity: e.target.value
            }
        })

        let history = JSON.parse(localStorage.getItem("cart"));
        let result = history.find(arr => arr.id === this.state.item.product_id);
        console.log(result)
        result.quantity = e.target.value;
        history = history.filter(arr => arr.id !== this.state.item.product_id)
        localStorage.setItem("cart", JSON.stringify([...history, result]))
    }

    updateSize = (e) => {
        this.setState({
            item:{ 
                ...this.state.item,
                size: e.target.value.toString(),
            }
        })
        let history = JSON.parse(localStorage.getItem("cart"));
        let result = history.find(arr => arr.id === this.state.item.product_id);
        console.log(result)
        result.size = e.target.value;
        history = history.filter(arr => arr.id !== this.state.item.product_id)
        localStorage.setItem("cart", JSON.stringify([...history, result]))
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
                            
            <Col className="flex"  xs={6} md={4}>
                    <Card.Img variant="top" src={item['imageLink']} style={{width: '10rem'}}/>
                <Col style={{marginTop: '50px'}} >
                    <Card.Title ><b>{item['name']}</b></Card.Title>
                    <select value={item.size} onChange = {(e) => this.updateSize(e)} name="size">
                        <option value="xxs">xxs</option>
                        <option value="xs">xs</option>
                        <option value="s">s</option>
                        <option value="m">m</option>
                        <option value="l">l</option>
                        <option value="xl">xl</option>
                        <option value="xxl">xxl</option>
                    </select>
                    <Button onClick={(e) => this.removeItem(e)}> remove </Button>
                </Col>
                
            </Col>
                
                <Col xs={6} md={4}>
                    <input style={{marginLeft:'180px',marginTop: '50px',width:'40px'}} type="number" onChange={(e) => this.handleChange(e)} value={item.quantity} name="quantity" min="1" />
                </Col>
                
                <Col xs={6} md={4}>
                    <Card.Text style={{fontSize:'20px', fontWeight:'600',float:'right',marginTop: '50px'}}>{item.price}</Card.Text>
                </Col>
            
            </Row>
        )
    }
}

export default CartItem;