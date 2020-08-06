import React,{Component} from 'react';
import Order from '../../../../components/Order/Order';
import Axios from '../../../../axios-orders';

class Orders extends Component{
    state={
        order:[],
        loading:true
    }

    componentDidMount(){
        Axios.get('/orders.json')
        .then(res=>{
            const data=[];
            for(let i in res.data){
                data.push({
                    ...res.data[i],
                    id:i
                });
            }
            this.setState({loading:false,order:data});
        })
    }
    render(){
        return(
                <div>
                    {this.state.order.map(res=>(
                        <Order price={+res.price} key={res.id} ingredients={res.ingredient}/>
                    ))}
                </div>
        )
    }
}

export default Orders;