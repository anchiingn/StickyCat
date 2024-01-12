import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadAllCarts } from "../../redux/cardReducer";
import { NavLink } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteFromCart from "./DeleteFromCart";

export default function AllCartStickers () {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const fetchCartStickers = useSelector(state => state.carts)

    useEffect(() => {
        dispatch(thunkLoadAllCarts())
    },[dispatch])

    const cart_stickers = fetchCartStickers ?Object.values(fetchCartStickers) :[]


    return (
        <>
            <div>
                <div>this is my cart</div>
                {cart_stickers.map(sticker => {
                    if (sticker && sticker.stickers && sticker.stickers.length > 0) {
                        // console.log(sticker)
                        return (
                            <div key={sticker?.id}>
                                <NavLink to={`/stickers/${sticker?.stickerId}`}>
                                    <img src={sticker?.stickers[0]?.image} alt={sticker?.stickers[0]?.title} style={{width:'100px', height:'100px'}}/>
                                    <div>{sticker?.stickers[0]?.title}</div>
                                    <div>{sticker?.stickers[0]?.price}</div>
                                    <div>{sticker?.quantity}</div>
                                </NavLink>
                                <OpenModalMenuItem 
                                    itemText={'remove'}
                                    modalComponent={<DeleteFromCart sticker={sticker}/>}
                                />
                            </div>
                        )
                    }
                })}
            </div>
        </>
    )
}