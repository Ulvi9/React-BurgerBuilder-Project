import React,{Component} from 'react';
import Aux from "../../../hoc/Auxilliary/auxilliary"
import Button from "../../UI/Button/Button";


class OrderSummary extends Component {
    //this should be functional component
    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log("[ordersummary] updated")
    }

    render() {
        const ingredients = Object.keys(this.props.ingredients)
            .map(key => {
                return <li key={key}>
                    <span style={{textTransform: "capitalize"}}>{key}</span>:{this.props.ingredients[key]}
                </li>
            });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredients}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )

    };
};
export default OrderSummary;
