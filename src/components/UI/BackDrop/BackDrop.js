import React from  'react';
import classes from './BackDrop.css';

const bD=(props)=>(
    props.open? <div className={classes.Backdrop} onClick={props.close}></div>: null
);

export default bD;