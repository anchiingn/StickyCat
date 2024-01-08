import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteFromCart, thunkLoadAllCarts } from "../../redux/cardReducer";
import { NavLink } from "react-router-dom";


export default function AllCartStickers () {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const fetchCartStickers = useSelector(state => state.carts)

    useEffect(() => {
        dispatch(thunkLoadAllCarts())
    },[dispatch])

    const cart_stickers = fetchCartStickers ?Object.values(fetchCartStickers) :[]

    const remove_sticker = async(e) => {
        e.preventDefault()
    }

    return (
        <>
            <div>
                <div>this is my cart</div>
                {cart_stickers.map(sticker => {
                    if (sticker && sticker.stickers && sticker.stickers.length > 0) {
                        return (
                            <div key={sticker?.id}>
                                <NavLink to={`/stickers/${sticker?.stickerId}`}>
                                    <img src={sticker?.stickers[0]?.image} alt={sticker?.stickers[0]?.title} style={{width:'100px', height:'100px'}}/>
                                    <div>{sticker?.stickers[0]?.title}</div>
                                    <div>{sticker?.stickers[0]?.price}</div>
                                </NavLink>
                                <button onClick={remove_sticker}>x</button>
                                <div>subtotal: {sticker?.stickers[0]?.price * sticker.quantity}</div>
                                <button>Checkout</button>
                            </div>
                        )
                    }
                })}
            </div>
        </>
    )
}