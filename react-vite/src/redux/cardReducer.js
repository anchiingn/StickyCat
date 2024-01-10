const LOAD_ALL_CARTS = 'cart/loadAllCarts'
const ADD_TO_CART = 'cart/addToCart'
const DELETE_FROM_CART = 'cart/deleteFromCart'

const loadAllCarts = (stickers) => {
    return {
        type: LOAD_ALL_CARTS,
        stickers
    };
}

const addToCart = (sticker) => {
    return {
        type: ADD_TO_CART,
        sticker
    };
}

const deleteFromCart = (sticker) => {
    return {
        type: DELETE_FROM_CART,
        sticker
    };
}

//thunks
export const thunkLoadAllCarts = () => async (dispatch) => {
    const res = await fetch("/api/carts/my-cart");
    if (res.ok) {
        const allStickers = await res.json();
        dispatch(loadAllCarts(allStickers));
        return allStickers;
    } else {
        throw new Error('Failed to load all cart stickers');
    }
};

export const thunkAddToCart = (sticker, id) => async (dispatch) => {
    const res = await fetch(`/api/carts/${id}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sticker)
    })

    if (res.ok) {
        const sticker = await res.json();
        dispatch(addToCart(sticker));
        return sticker;
    }
    else {
        throw new Error('Failed to add to cart');
    }
}

export const thunkDeleteFromCart = (id) => async (dispatch) => {
    const res = await fetch(`/api/carts/${id}/remove`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    })

    if (res.ok) {
        const sticker = await res.json();
        dispatch(deleteFromCart(sticker));
        return sticker;
    }
    else {
        throw new Error('Failed to delete from cart');
    }
}

//reducer
const initialState = {}
export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_CARTS:
            const newStates = {...state}
            action.stickers.forEach(sticker => newStates[sticker.id] = sticker)
            // console.log('newState', newStates)
            return newStates
        case ADD_TO_CART:
            return { ...state, [action.sticker.id]: action.sticker };
        case DELETE_FROM_CART:
            let newState = { ...state };
            delete newState[action.sticker];
            return newState;
        default:
            return state
    }
} 