import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteFromCart from "./DeleteFromCart";
import { thunkAddToCart, thunkLoadAllCarts, thunkRemoveOneSticker } from "../../redux/cardReducer";

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
                        <div>{sticker?.stickers[0]?.title}</div>
                        <div>${sticker?.stickers[0]?.price}</div>
                    </div>
                    <div className="cart-infos">
                        <div>Quantity -</div>
                        <div style={{display:'flex'}} id="quantity-add-remove">
                            <button style={{marginRight:'6px'}} onClick={removeSticker}><i className="fa-solid fa-minus"></i></button>
                            <div>{sticker?.quantity}</div>
                            <button style={{marginLeft:'5px'}} onClick={addSticker}><i className="fa-solid fa-plus"></i></button>
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