import React, {Component} from 'react';
import Aux from "../../hoc/auxilliary";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
const ingredientsPrice={
    salad:0.5,
    bacon:0.2,
    cheese:0.6,
    meat:0.1

}
class BurgerBuilder extends Component {
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchasable:false,
        purchasing:false
    }
    updatePurchasesState=(ingredients)=>{
        const sum=Object.keys(ingredients)
            .map(key=>{
               return ingredients[key]
        })
            .reduce((sum,el)=>{
                return sum+el;
            },0)
        this.setState({purchasable:sum>0})
    }
    addIngredientHandler=(type)=>{
     const oldCount=this.state.ingredients[type];
     const updatedCount=oldCount+1;
     const updatedIngredients={
         ...this.state.ingredients
     };
     updatedIngredients[type]=updatedCount;
     const priceAddition=ingredientsPrice[type];
     const oldPrice=this.state.totalPrice;
     const newPrice=oldPrice+priceAddition;
     this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
     this.updatePurchasesState(updatedIngredients)
    }
    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        if(oldCount<=0){
            return ;
        }
        const updatedCount=oldCount-1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceDeduction=ingredientsPrice[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDeduction;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchasesState(updatedIngredients);
    }
    purchasingHandler=()=>{
        this.setState({purchasing:true})
    };
    purchasingCancelHandler=()=>{
        this.setState({purchasing:false})
    };
    purchasingContinueHandler=()=>{
        alert("Continue")
    }

    render() {
        const disabledInfo={
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        return (
           <Aux>
               <Modal show={this.state.purchasing}
                      modalClosed={this.purchasingCancelHandler}>
                   <OrderSummary
                       ingredients={this.state.ingredients}
                       purchaseCancelled={this.purchasingCancelHandler}
                       purchaseContinued={this.purchasingContinueHandler}
                       price={this.state.totalPrice}/>
               </Modal>
               <Burger ingredients={this.state.ingredients}/>
               <BurgerControls
                   ingredientAdded={this.addIngredientHandler}
                   ingredientRemoved={this.removeIngredientHandler}
                   disabled={disabledInfo}
                   price={this.state.totalPrice}
                   purchasable={this.state.purchasable}
                   ordered={this.purchasingHandler}/>
           </Aux>
        );
    }
}

export default BurgerBuilder;
