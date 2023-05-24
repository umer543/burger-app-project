import React from "react";
import classes from './BuildControls.css';
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'}
];

const buildControls = (props) =>{

return <div className={classes.BuildControls}>
    <p><strong>$ {props.price}</strong></p>
{ 

controls.map(ctrl => <BuildControl key={ctrl.label} label={ctrl.label} ingredientAdded={() => props.addIngredient(ctrl.type)} 
                            ingredientRemoved={() => props.removeIngredient(ctrl.type)} disableBtn={props.disableBtnInfo[ctrl.type]}/>) 
                            
}
<button className={classes.OrderButton} disabled={!props.purchaseable}>ORDER NOW</button>
</div>;

}

export default buildControls;