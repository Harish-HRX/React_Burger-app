import React from 'react';
import classes from './BuiltControl.css' 

const BuiltControl=(props)=>(
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less}
         onClick={props.deduced}
         disabled={props.remove}>Less</button>
        <button className={classes.More} 
        onClick={props.added}>More</button>
    </div>
);

export default BuiltControl;