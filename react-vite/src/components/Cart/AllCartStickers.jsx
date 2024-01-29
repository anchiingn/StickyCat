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
        {cart_stickers.length !== 0 ? (
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
        ) :(
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <img src="https://stickycat.s3.us-east-2.amazonaws.com/IMG_2919.PNG" alt="" style={{width:'100%'}}/>
                <div>Cart is Empty</div>
            </div>
        )}
        </>
    )
}