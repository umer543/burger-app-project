import React from "react";
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
        return (<li key={igKey + props.ingredients[igKey]}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>);
    });

    return(
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A Delicious Burger With The Following Ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType="Success" clicked={props.continueClick}>Continue</Button>
            <Button btnType="Danger" clicked={props.cancelClick}>Cancel</Button>
        </Auxiliary>
    );
}

export default orderSummary;