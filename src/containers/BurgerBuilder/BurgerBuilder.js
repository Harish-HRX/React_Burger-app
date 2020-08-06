import React,{Component} from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import Fux from '../../hoc/fux'
import Burger from '../../components/Burger/Burger';
import BuiltControls from '../../components/Burger/BuiltControls/BuiltControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import classes from './BurgerBuilder.css'

const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component{
    state={
        ingredients:null,
        totalPrice:4,
        purchasing:false,
        purchasable:false,
        Loading:false
    }

    componentDidMount(){
        axios.get('https://mynew-react-burger.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data});
        }); 
    }

    updatePurchasable=(ingredients)=>{
       const sum=Object.keys(ingredients).map((val)=>{
           return ingredients[val];})
          .reduce((sum,el)=>sum=sum+el,0);
       this.setState({purchasable:sum>0});
    }

    addIngredientHandler=(type)=>{
        const oldCount =this.state.ingredients[type];
        const updatedCount =oldCount +1;
        const updateIngredient={
            ...this.state.ingredients
        }
        updateIngredient[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updateIngredient });
        this.updatePurchasable(updateIngredient);
    }

    removeIngredientHandler=(type)=>{
        const oldCount =this.state.ingredients[type];
        if(oldCount<=0) return;
        const updatedCount =oldCount -1;
        const updateIngredient={
            ...this.state.ingredients
        }
        updateIngredient[type]=updatedCount;
        const pricededuce=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-pricededuce;
        this.setState({totalPrice:newPrice,ingredients:updateIngredient });
        this.updatePurchasable(updateIngredient);
    }
    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }

    purchaseCanceller=()=>{
        this.setState({purchasing:false});
    }

    purchaseContinued=()=>{
       /* this.setState({Loading:true});
        const order={
            ingredient:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                Name:'Haish',
                Mail:'Harish@mail'
            },
            deliveryMethod:'Express-Delivery'
        };
        axios.post("/orders.json",order)
        .then(res=>{this.setState({Loading:false,purchasing:false})})
        .catch(error=>{this.setState({Loading:false,purchasing:false})});*/
        //alert("Super da chellakutty!!");
        const queryParam=[];
        for(let i in this.state.ingredients){
            queryParam.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        }
        queryParam.push('price='+this.state.totalPrice)
        const queryString=queryParam.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString
        });
    }

    render(){
        const updateIngredien={...this.state.ingredients};
        for(let i in updateIngredien){
            updateIngredien[i]= updateIngredien[i] <= 0 
        }
        let orderSummary=null;
        let burger=<Spinner/>;
        if(this.state.ingredients){
            burger=(
                <Fux>
                    <div className={classes.BurgerBuilder}>
                    <Burger ingredient={this.state.ingredients}/>
                    </div>
                    <BuiltControls
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientDeduced={this.removeIngredientHandler}
                    RemoveButton={updateIngredien}
                    totalPrice={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}/>
                </Fux>
            );
                orderSummary=<OrderSummary ingredients={this.state.ingredients}
                purchasecontinue={this.purchaseContinued}
                purchasecancel={this.purchaseCanceller}
                totPrice={this.state.totalPrice}/>;
        }
        if(this.state.Loading){
            orderSummary=<Spinner/>;       
        }
        return(
            <Fux>
                <Modal show={this.state.purchasing} ModalCancel={this.purchaseCanceller}>
                {orderSummary}
                </Modal>
                {burger}
            </Fux>
        );
    }
}

export default BurgerBuilder;