import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkAddToCart, thunkLoadAllCarts, thunkRemoveOneSticker } from "../../redux/cardReducer";
import './Cart.css'

export default function CartStickerCards ({ sticker }) {
    const dispatch = useDispatch()

    const addSticker = async () => {
        await dispatch(thunkAddToCart(sticker, sticker?.stickerId))
        await dispatch(thunkLoadAllCarts())
    }

    const removeSticker = async () => {
        await dispatch(thunkRemoveOneSticker(sticker?.id))
        await dispatch(thunkLoadAllCarts())
    }

    return (
        <>
        <div key={sticker?.id}>
            <NavLink to={`/stickers/${sticker?.stickerId}`} id="cart-sticker-cards_container" className={'navlink'} style={{cursor:'default'}}>
                <div id="cart-sticker-images_container">
                    <img src={sticker?.stickers[0]?.image} alt={sticker?.stickers[0]?.title}/>
                </div>
            </NavLink>
                <div id="cart-infos_container">
                    <div className="cart-infos">
                        <div style={{fontWeight:'bold'}}>{sticker?.stickers[0]?.title}</div>
                    </div>
                    <div className="cart-infos">
                        <div>${sticker?.stickers[0]?.price}</div>
                        <div style={{display:'flex'}} id="quantity-add-remove">
                            <button style={{marginRight:'10px'}} onClick={removeSticker}>-</button>
                            <div>{sticker?.quantity}</div>
                            <button style={{marginLeft:'10px'}} onClick={addSticker}>+</button>
                        </div>
                    </div>
                </div>


                
                {/* <div id="remove-card" style={{listStyle:'none'}}>
                    <OpenModalMenuItem 
                        itemText={<><i class="fa-regular fa-trash-can"></i></>}
                        modalComponent={<DeleteFromCart sticker={sticker}/>}
                    />
                </div> */}
        
        </div>       
        </>
    )
}