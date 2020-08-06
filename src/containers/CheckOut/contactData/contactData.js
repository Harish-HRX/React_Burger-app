import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './contactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class contact extends Component{
    state={
        orderFrom:{
            Name:{
                elementType:'input',
                elementConfig:{
                    type:"text",
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            Mail:{
                elementType:'input',
                elementConfig:{
                    type:"email",
                    placeholder:'Your E-mail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    option:[
                        {value:"fastest",displayValue:"Fastest"},
                        {value:"slowest",displayValue:"Cheapest"}
                    ]
                },
                vlaidation:{},
                value:'',
                valid:true
            }
        },
        formValid:false,
        loading:false
    }
    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({Loading:true});
        const formData={};
        for(let inputdata in this.state.orderFrom){
            formData[inputdata]=this.state.orderFrom[inputdata].value;
        }
        const order={
            ingredient:this.props.ingredients,
            price:this.props.price,
            orderData:formData
        };
        axios.post("/orders.json",order)
        .then(res=>{
                    this.setState({Loading:false});
                    this.props.history.push('/');
                    console.log(res);
                })
        .catch(error=>{this.setState({Loading:false})});
    }
    checkValidity=(value,rule)=>{
        let isValid=false;
        if(!rule){
            return true;
        }
        if(rule.required){
            isValid=value.trim()!=='';
        }
        return isValid;
    }
    InputChange=(event,ipid)=>{
       const UpdatedOrder={...this.state.orderFrom};
       const UpdatedOrderElement={...UpdatedOrder[ipid]};
       UpdatedOrderElement.value=event.target.value;
       UpdatedOrderElement.valid=this.checkValidity(UpdatedOrderElement.value, UpdatedOrderElement.validation);
       UpdatedOrderElement.touched=true;
       UpdatedOrder[ipid]=UpdatedOrderElement;
       let formIsValid=true;
       for(let input in UpdatedOrder){
            formIsValid= UpdatedOrder[input].valid&&formIsValid;
       }
       this.setState({orderFrom:UpdatedOrder,formValid:formIsValid});
    }
    render(){
        let formElements=[];
        for(let key in this.state.orderFrom){
            formElements.push({
                id:key,
                config:this.state.orderFrom[key]
            });
        }
        let form=( <form onSubmit={this.orderHandler}> 
            {
                formElements.map(element=>(
                    <Input key={element.id} elementtype={element.config.elementType} shouldValidate={element.config.validation}
                    elementConfig={element.config.elementConfig} value={element.config.value} 
                    inValid={!element.config.valid} touched={element.config.touched}
                    changed={(event)=>this.InputChange(event,element.id)}/>
                ))
            }
        <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
        </form>);
        if(this.state.loading){
            form=<Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
               {form}
            </div>
        );
    }
}

export default contact;