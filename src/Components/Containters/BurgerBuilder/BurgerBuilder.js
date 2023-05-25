import React, {Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 0.3,
    cheese: 0.4,
    meat: 1.5,
    bacon: 0.7
}

class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 5,
        purchaseable: false,
        purchasing: false
    }

    addMoreHandler = (type) => {
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = this.state.ingredients[type] + 1;
        this.setState({ingredients: newIngredients, totalPrice: this.state.totalPrice + INGREDIENT_PRICE[type], purchaseable: this.updatePurchaseable(newIngredients)});
    }

    removeIngredientHandler = (type) =>{
        const newIngredients = {...this.state.ingredients};
        const oldCount = this.state.ingredients[type];
        if (oldCount <=0){
            return;
        }
        newIngredients[type] = oldCount - 1;
        this.setState({ingredients: newIngredients, totalPrice: this.state.totalPrice - INGREDIENT_PRICE[type], purchaseable: this.updatePurchaseable(newIngredients)});
    }

    updatePurchaseable = (ingredients)=> {
        const totalSum = Object.keys(ingredients).map(igKeys => {
            return ingredients[igKeys]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)

        return totalSum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    closeModal = () => {
        this.setState({purchasing: false});
    }

    cancelPurchase = ()=>{
        this.setState({purchasing: false});
    }

    continuePurchase = ()=>{
        alert('You Purchased a burger');
    }

    render(){

        const disabledInfo = {...this.state.ingredients};

        for(let key in disabledInfo){
            if(disabledInfo[key] <=0){
                disabledInfo[key] = true;
            }else{
                disabledInfo[key] = false;
            }
        }

        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} closeModal={this.closeModal}>
                    <OrderSummary ingredients={this.state.ingredients} continueClick={this.continuePurchase} cancelClick={this.cancelPurchase}/></Modal>
                <div><Burger ingredients={this.state.ingredients}/></div>
                <div>
                    <BuildControls 
                        addIngredient={this.addMoreHandler} 
                        removeIngredient={this.removeIngredientHandler} 
                        disableBtnInfo={disabledInfo}
                        price={this.state.totalPrice.toFixed(2)}
                        purchaseable= {this.state.purchaseable}
                        showOrder= {this.purchaseHandler}/>
                </div>
            </Auxiliary> 
        )
    }
}

export default BurgerBuilder;