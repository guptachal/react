import {
    ADD_TO_CART,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {

    if (action.type === ADD_TO_CART) {

        const { id, color, amount, product } = action.payload;

        // check if the itme already exist in the cart.
        const tempItem = state.cart.find((item) => {
            return item.id === id && item.color === color;
        });
        console.log("temp Item: ")
        console.log(tempItem)
        // if the item exist
        if (tempItem) {
            // create the temp cart and for the matching product in the cart update the amount of items.
            const tempCart = state.cart.map((cartItem) => {
                if (cartItem.id === id && cartItem.color === color) {
                    let newAmount = cartItem.amount + amount; // Fix: use cartItem.amount
                    if (newAmount >= cartItem.max) {
                        newAmount = cartItem.max;
                    }
                    return { ...cartItem, amount: newAmount };
                } else {
                    return cartItem; // Important: return unchanged items
                }
            });
            return { ...state, cart: tempCart };
        } else {

            const newItem = {
                id: id,
                name: product.name,
                image: product.images[0].url,
                price: product.price,
                max: product.stock,
                color: color,
                amount: amount, // Fix: set the initial amount
            };
            return { ...state, cart: [...state.cart, newItem] };
        }
    }
    if (action.type === REMOVE_CART_ITEM) {
        const id = action.payload.id
        let tempCart = state.cart.filter((item) => {
            return !(item.id === id)
        })
        return { ...state, cart: tempCart }
    }
    if (action.type === CLEAR_CART) {

        return { ...state, cart: [] }
    }
    if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
        const id = action.payload.id
        const value = action.payload.value
        let tempCart = state.cart.map((item) => {
            if (item.id === id) {
                if (value > item.max) {
                    item.amount = item.max
                } else {
                    item.amount = value
                }
                if (value < 1) {
                    item.amount = 1
                }
                return item
            } else {
                return item
            }
        })
        return { ...state, cart: tempCart }
    }
    if (action.type === COUNT_CART_TOTALS) {
        let tempTotalItem = 0;
        let tempTotalAmount = state.shipping;
        let tempShipping = 0;
        state.cart.map((item) => {
            tempTotalItem += item.amount;
            tempShipping += item.shipping;
            tempTotalAmount += item.amount * item.price
        })
        return { ...state, total_item: tempTotalItem, total_amount: tempTotalAmount }
    }
    throw new Error(`No Matching "${action.type}" - action type`); // throw the error.
};

export default cart_reducer;
