import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger=(props)=>{
    let transformedIndg=Object.keys(props.ingredient).map(ing=>{
            return [...Array(props.ingredient[ing])].map((_,index)=>{
                return <BurgerIngredient key={ing+index} type={ing}/>
            });
        }).reduce((arr,el)=>{
            return arr.concat(el);
        },[]);
        
        if(transformedIndg.length===0){
            transformedIndg=<p>Dey Makkah ingredients add panra</p>;
        }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIndg}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

export default Burger;