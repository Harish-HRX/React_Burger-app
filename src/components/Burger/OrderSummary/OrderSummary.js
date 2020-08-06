import React,{Component} from 'react';
import Fux from '../../../hoc/fux';
import Button from '../../UI/Button/Button'

class Order extends Component{
    render(){
        const ingredientList=Object.keys(this.props.ingredients)
        .map(item=>{
        return (<li key={item}>
                <span style={{textTransform:'capitalize'}}>{item}</span> : {this.props.ingredients[item]}
                </li>);
        });
        return (
            <Fux>
            <h3>Your Order</h3>
            <p>A Delicious burger with the following ingredients</p>
            <ul>
                {ingredientList}
            </ul>
            <p> <strong>Total Price : {this.props.totPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Success" clicked={this.props.purchasecontinue}>CONTINUE</Button>
            <Button btnType="Danger" clicked={this.props.purchasecancel}>CANCEL</Button>
        </Fux>
        );
    };
};

export default Order;