import React from "react";
import Auxiliary from '../../../hoc/Auxiliary';

const orderSummary = (props) => {

    const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
        return (<li><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>);
    });

    return(
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A Delicious Burger With The Following Ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to Checkout</p>
        </Auxiliary>
    );
}

export default orderSummary;