import { thunkDeleteFromCart, thunkAddToCart, thunkLoadAllCarts } from "../../redux/cardReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


const CartIcon = () => {
    const dispatch = useDispatch();
    const loadStickerCarts = useSelector(state => state.carts);
    const user = useSelector (state => state.session.user)

    
    useEffect(() => {
        dispatch(thunkLoadAllCarts())
    }, [dispatch])

    const stickerCarts = Object.values(loadStickerCarts)

    let quantity = 0
    for (let sticker of stickerCarts) {
        if (user) {
            quantity += sticker.quantity
        }
    }

    return (
        <div className="cartIcon_container">
            <i className="fa-solid fa-cart-shopping"></i>
            <div className="cart_length_number">{quantity}</div>
        </div>
    )
}

export default CartIcon