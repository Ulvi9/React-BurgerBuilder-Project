import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from '../../../store/actions/index'
class ContactData extends Component {
    state={
        orderForm:{
            name:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Your Name"
                },
                value:"",
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            zipCode:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Your Zipcode"
                },
                value:"",
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Your Street"
                },
                value:"",
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Your Country"
                },
                value:"",
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Your Email"
                },
                value:"",
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:"select",
                elementConfig:{
                    options:[
                        {value:"fastest",displayValue:"Fastest"},
                        {value:"cheapest",displayValue:"Cheapest"}
                    ]
                },
                value:"fastest",
                valid:true,
                validation:{}
            }
        },
        formValid:false
    }
    orderHandler=(e)=>{
        e.preventDefault();
        this.setState({loading:true})
        const formData={};
        for (let key in this.state.orderForm){
            formData[key]=this.state.orderForm[key].value
        }
        const order={
            ingredients:this.props.ing,
            price:this.props.price,
            orderData:formData
        };
        this.props.onOrderBurger(order);
    }
    checkFormValidation(value,rules ){
        let isValid=true;
        if (rules.required){
            isValid=value.trim()!==""&&isValid
        };
        if (rules.minLength){
            isValid=value.length>=rules.minLength&&isValid
        };
        if (rules.maxLength){
            isValid=value.length<=rules.maxLength&&isValid
        };
        return isValid;
    }

    inputChangedHandler(event, id) {
    let updateOrderForm={
        ...this.state.orderForm
    };
    let updateFormElement={
        ...updateOrderForm[id]
    }
        updateFormElement.value=event.target.value;
        updateFormElement.valid= this.checkFormValidation(updateFormElement.value,updateFormElement.validation);
        console.log(updateFormElement);
        updateFormElement.touched=true;
        updateOrderForm[id]=updateFormElement
        let formValidation=true;
        for (let key in updateOrderForm){
            formValidation=updateOrderForm[key].valid&&formValidation
        }
        this.setState({orderForm:updateOrderForm,formValid:formValidation})
    }
    render() {
        let formsElementsArr=[];
        for (let key in this.state.orderForm){
            formsElementsArr.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form=(
            <form onSubmit={this.orderHandler} >
                {formsElementsArr.map(formElement=>(
                    <Input
                        changed={(event=>this.inputChangedHandler(event,formElement.id))}
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        inValid={!formElement.config.valid}
                        shouldValidation={formElement.config.validation}
                        touched={formElement.config.touched}/>
                ))}
                <Button
                    btnType="Success"
                    disabled={!this.state.formValid}
                    >Order</Button>
            </form>
        );
        if (this.props.loading){form=<Spinner/>}
        return (
            <div className={classes.ContactData}>
             <h4>Enter your Contact data</h4>
                {form}
            </div>
        );
    }

}
const mapStateToProps=(state)=>{
    return{
        ing:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading: state.orderR.loading
    }
};
const mapDispatchToProps=dispatch=>{
    return{
        onOrderBurger: (orderData)=> dispatch(orderActions.purchaseBurger(orderData))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
