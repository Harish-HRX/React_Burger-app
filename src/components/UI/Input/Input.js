import React from 'react';
import classes from './Input.css';

const Input=(props)=>{
    let inputClasses=[classes.InputElement];
    if(props.inValid&&props.shouldValidate&&props.touched){
        inputClasses.push(classes.Invalid);
    }
    let inputElement=null;
    switch(props.elementtype){
        case ('input'): inputElement=<input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
        break;
        case ('textarea'): inputElement=<textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
        break;
        case ('select'): inputElement=(
            <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                 {props.elementConfig.option.map(opt=>(
                         <option key={opt.value} value={opt.value} >
                             {opt.displayValue}</option>
                     ))}
            </select>
        );
        break;
        default:inputElement=<input className={classes.InputElement} {...props.elementConfig}/>;
    }
    return(
        <div  className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;