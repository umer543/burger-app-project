import React, {Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import axios from '../../../axios-orders';
import Spinner from '../../UI/Spinners/Spinner';
import withErrorsHandler from '../../../hoc/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.3,
    cheese: 0.4,
    meat: 1.5,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 5,
        purchaseable: false,
        purchasing: false,
        checkoutOrder: false,
        error: false
    }

    componentDidMount(){
        
        axios.get('/ingredients.json').then(res =>{
            this.setState({ingredients: res.data});
        }).catch(error => {
            this.setState({error: true})
        })

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
       // alert('You Purchased a burger');
       this.setState({checkoutOrder: true})
       const order = {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
        customer: {
            name: 'Asad',
            address:
            {
                street: 'Test street',            
                zipCode: '4545',
                city: 'Lahore'
            },
            email: 'test@test.com '
        },
        deliveryMethod: 'COD'
       }

        axios.post('/orders.json', order)
        .then(response => {
            this.setState({checkoutOrder: false, purchasing: false})
        })
        .catch(error => {
            this.setState({checkoutOrder: false, purchasing: false})
        })

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

        let orderSummary = null

        let burgerContainer = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if(this.state.ingredients){
            
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients} 
            continueClick={this.continuePurchase}
            cancelClick={this.cancelPurchase}
            price={this.state.totalPrice.toFixed(2)}/>

            burgerContainer =  
            <Auxiliary>
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
        }

        if(this.state.checkoutOrder){
            orderSummary = <Spinner />
        }

        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} closeModal={this.closeModal}>
                    {orderSummary}
                </Modal> 
               {burgerContainer}
            </Auxiliary>
        )
    }
}

export default withErrorsHandler(BurgerBuilder, axios);