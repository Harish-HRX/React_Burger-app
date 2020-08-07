import React,{Component} from  'react'
import classes from './Modal.css'
import Fux from '../../../hoc/fux';
import BackDrop from '../BackDrop/BackDrop';
class Modal extends Component{
    shouldComponentUpdate(nextProp,nextState){
        return nextProp.show!==this.props.show||nextProp.children!==this.props.children;
    }
    render(){
        return (
            <Fux>   
                <BackDrop opened={this.props.show} closed={this.props.ModalCancel}/>
               <div 
               className={classes.Modal}
               style={{
                   transform: this.props.show?'translateY(0)':'translateY(-100vh)',
                   opacity:this.props.show?'1':'0'
               }}>
                   {this.props.children}
               </div>
           </Fux>
           );   
    }
}

export default Modal;