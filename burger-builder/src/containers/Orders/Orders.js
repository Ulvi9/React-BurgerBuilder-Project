import React, {Component} from 'react';
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import * as actions from "../../store/actions/index";
import {connect} from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {

    componentDidMount() {
     this.props.onFetchOrders()
    }

    render() {
        let orders=<Spinner/>
        if (!this.props.loading){
            orders=(this.props.orders.map(order=>(
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}/>
                    ))
            )
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}
const mapsToProps=(state)=>{
    return{
       loading:state.orderR.loading,
        orders:state.orderR.orders
    }
}
const dispatchToProps=dispatch=>{
    return{
        onFetchOrders:()=>dispatch(actions.fetchOrder())
    }
}
export default connect(mapsToProps,dispatchToProps)(withErrorHandler(Orders,axios));
