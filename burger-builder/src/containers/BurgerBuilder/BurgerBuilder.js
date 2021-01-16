import React, {Component} from 'react';
import Aux from "../../hoc/Auxilliary/auxilliary";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import {connect} from "react-redux"
import axios from "../../axios-orders";
class BurgerBuilder extends Component {
    state={
        purchasing:false,
    }
    componentDidMount() {
         //console.log(this.props)
        this.props.onInitIngredient();
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
        // const queryParams=[];
        // for (let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+ "="+ encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push("price="+this.state.totalPrice)
        // const queryString=queryParams.join("&");
        // this.props.history.push({
        //     pathname:"/checkout",
        //     search:"?"+queryString
        // })
        this.props.onInitPurchased();
        this.props.history.push("/checkout")
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
        // let burger=this.props.error?<p>Cant loaded</p>
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
        ing:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onIngredientsAdd:(ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientsRemove:(ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredient:()=>dispatch(actions.initIngredients()),
        onInitPurchased:()=>dispatch(actions.purchaseInit())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
