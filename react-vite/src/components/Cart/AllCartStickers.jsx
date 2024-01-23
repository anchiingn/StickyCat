import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadAllCarts } from "../../redux/cardReducer";
import CartStickerCards from "./CartStickerCards";

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
            <div >
                {cart_stickers.map(sticker => {
                    if (sticker && sticker.stickers && sticker.stickers.length > 0 && sticker.userId === user.id) {
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