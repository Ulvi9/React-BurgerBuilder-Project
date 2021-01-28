import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route, Redirect} from "react-router-dom"
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux"

class Checkout extends Component {

    checkoutContinuedHandler=()=>{
        this.props.history.replace("/checkout/contact-data")
    };
    checkoutCancelledHandler=()=>{
        this.props.history.goBack();
    };
    // componentWillMount() {
    //     const query= new URLSearchParams(this.props.location.search);
    //     const ingredients={};
    //     let price=0;
    //     for (let param of query.entries()){
    //         if (param[0]=="price"){
    //             price=param[1];
    //         }else{
    //             ingredients[param[0]]=+param[1]
    //         }
    //     }
    //     this.setState({ingredients:ingredients,price:price})
    // }

    render() {
        let summary=<Redirect to='/' />
        if (this.props.ing){
            const purchasedRedirect=this.props.purchased?<Redirect to='/'/>:null
            summary=(
              <div>
                  {purchasedRedirect}
                  <CheckoutSummary
                      ingredients={this.props.ing}
                      checkoutContinued={this.checkoutContinuedHandler}
                      checkoutCancelled={this.checkoutCancelledHandler}/>
                  <Route
                      path={this.props.match.path+"/contact-data"}
                      component={ContactData}
                  />
              </div>
            )
        }
        return summary;
            // <div>
            //     {summary}
            //
            //     render={(props)=>(<ContactData
            //         ingredients={this.state.ingredients}
            //         price={this.state.price}
            //         {...props}/>)
            // </div>

    }
}
const mapStateToProps=(state)=>{
    return{
        ing:state.burgerBuilder.ingredients,
        purchased: state.orderR.purchased
    }
}
export default connect(mapStateToProps)(Checkout);
