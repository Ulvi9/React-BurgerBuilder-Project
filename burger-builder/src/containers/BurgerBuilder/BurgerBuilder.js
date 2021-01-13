import React, {Component} from 'react';
import Aux from "../../hoc/Auxilliary/auxilliary";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";
import {connect} from "react-redux"

class BurgerBuilder extends Component {
    state={
        purchasing:false,
        loading:false
    }
    componentDidMount() {
        // axios.get("https://react-myburger-9dbac-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json")
        //     .then(response=>{
        //         this.setState({ingredients:response.data})
        //         console.log(response)
        //     })
        //     .catch(error=>{});
    }

    updatePurchasesState=(ingredients)=>{
        const sum=Object.keys(ingredients)
            .map(key=>{
                return ingredients[key]
            })
            .reduce((sum,el)=>{
                return sum+el;
            },0)
        return sum>0
    };
    purchasingHandler=()=>{
        this.setState({purchasing:true})
    };
    purchasingCancelHandler=()=>{
        this.setState({purchasing:false})
    };
    purchasingContinueHandler=()=>{
        const queryParams=[];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+ "="+ encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push("price="+this.state.totalPrice)
        const queryString=queryParams.join("&");
        this.props.history.push({
            pathname:"/checkout",
            search:"?"+queryString
        })
    }
    render() {
        const disabledInfo={
            ...this.props.ing
        };
        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        let orderSummary=null;
        let burger=<Spinner/>;
        if (this.props.ing){
            burger=(
                <Aux>
                    <Burger ingredients={this.props.ing}/>
                    <BurgerControls
                        ingredientAdded={this.props.onIngredientsAdd}
                        ingredientRemoved={this.props.onIngredientsRemove}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this. updatePurchasesState(this.props.ing)}
                        ordered={this.purchasingHandler}/>
                </Aux>);
            orderSummary= <OrderSummary
                ingredients={this.props.ing}
                purchaseCancelled={this.purchasingCancelHandler}
                purchaseContinued={this.purchasingContinueHandler}
                price={this.props.price}/>
        }
        if (this.state.loading){
            orderSummary=<Spinner/>;
        };
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                       modalClosed={this.purchasingCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        ing:state.ingredients,
        price:state.totalPrice
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onIngredientsAdd:(ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
        onIngredientsRemove:(ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName })
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
