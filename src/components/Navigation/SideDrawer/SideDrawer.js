import React from 'react'
import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo';
import NavigationalItems from '../NavigationItems/NavigationItems';
import Fux from '../../../hoc/fux';
import BackDrop from '../../UI/BackDrop/BackDrop';

const SideDrawer=(props)=>{
    let attachedClasses=[classes.SideDrawer,classes.Close];
    if(props.opened){
        attachedClasses=[classes.SideDrawer,classes.Open];
    }
    return(
        <Fux>
            <BackDrop close={props.closed}
            open={props.opened}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
             </div>
                <nav>
                    <NavigationalItems/>
                </nav>
            </div>   
         </Fux>
    );
}

export default SideDrawer;