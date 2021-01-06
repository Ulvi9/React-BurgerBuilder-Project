import React from 'react';
import Aux from "../../../hoc/auxilliary"
import Button from "../../UI/Button/Button"

const orderSummary = (props) => {
    const ingredients=Object.keys(props.ingredients)
        .map(key=>{
            return <li key={key}>
                      <span style={{textTransform:"capitalize"}}>{key}</span>:{props.ingredients[key]}
                   </li>
        })
    return (
       <Aux>
           <h3>Your Order</h3>
           <p>A delicious burger with the following ingredients:</p>
           <ul>
               {ingredients}
           </ul>
           <p><strong>Total Price: {props.price}</strong></p>
           <p>Continue to Checkout?</p>
           <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
           <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
       </Aux>
    );
};

export default orderSummary;
