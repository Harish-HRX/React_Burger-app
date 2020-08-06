import React,{Component} from 'react';
import Fux from '../../hoc/fux';
import classes from './Layout.css';
import Toolbar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state={
        showSideDrawer:false
    }
    SideDrawerOpenHandler=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        });
    }
    SideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false});
    }

    render(){
        return (
            <Fux>
                <Toolbar toggleHandler={this.SideDrawerOpenHandler}/>
                <SideDrawer opened={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}/>
                <main className={classes.Content}>
                {this.props.children}
                </main>
            </Fux>
        );
    }
}

export default Layout;