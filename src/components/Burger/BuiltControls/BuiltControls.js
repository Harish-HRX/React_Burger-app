import React from 'react';
import classes from  './BuiltControls.css';
import BuiltControl from  './BuiltControl/BuiltControl';

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},
];

const BuiltControls=(props)=>(
    <div className={classes.BuiltControls}>
        <p>Current Price : <strong>{props.totalPrice.toFixed(2)}</strong></p>
       {controls.map((ctr)=>(
           <BuiltControl key={ctr.label} 
           label={ctr.label}
           added={()=>props.ingredientAdded(ctr.type)}
           deduced={()=>props.ingredientDeduced(ctr.type)}
           remove={props.RemoveButton[ctr.type ]}/>
       ))}
       <button className={classes.OrderButton} 
       disabled={!props.purchasable}
       onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default BuiltControls;