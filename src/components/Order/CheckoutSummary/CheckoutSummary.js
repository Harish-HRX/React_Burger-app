import React from 'react'; 
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';

const checkoutsummary=(props)=>{
    return(
        <div className={classes.checkoutSummary}>
        <h1>Ippidi tha un burger irukku</h1>
        <div >
            <Burger ingredient={props.ingredients}/>
        </div>
        <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
        <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
        </div>
    );
    
};

export default checkoutsummary;