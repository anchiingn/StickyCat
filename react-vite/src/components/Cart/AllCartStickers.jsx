import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadAllCarts } from "../../redux/cardReducer";
import { NavLink } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteFromCart from "./DeleteFromCart";
import CartStickerCards from "./CartStickerCards";

export default function AllCartStickers () {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const fetchCartStickers = useSelector(state => state.carts)
    const [show, setShow] = useState(false)

    useEffect(() => {
        dispatch(thunkLoadAllCarts())
    },[dispatch])

    const cart_stickers = fetchCartStickers ?Object.values(fetchCartStickers) :[]


    return (
        <>
            <div id="cart-stickers_container">
                {cart_stickers.map(sticker => {
                    if (sticker && sticker.stickers && sticker.stickers.length > 0) {
                        return (
                            <div key={sticker?.id}>
                                <CartStickerCards sticker={sticker} />
                            </div>
                        )
                    }
                })}
            </div>
        </>
    )
}