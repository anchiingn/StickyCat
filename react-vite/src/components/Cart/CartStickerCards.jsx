import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadAllCarts } from "../../redux/cardReducer";
import { NavLink } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteFromCart from "./DeleteFromCart";

export default function CartStickerCards ({ sticker }) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)


    return (
        <>
            <div id="cart-stickers_container">
                
                <div key={sticker?.id}>
                    <NavLink to={`/stickers/${sticker?.stickerId}`} id="cart-sticker-cards_container" className={'navlink'}>
                        <div id="cart-sticker-images_container">
                            <img src={sticker?.stickers[0]?.image} alt={sticker?.stickers[0]?.title}/>
                        </div>
                        <div id="cart-infos_container">
                            <div className="cart-infos">
                                <div>{sticker?.stickers[0]?.title}</div>
                                <div>${sticker?.stickers[0]?.price}</div>
                            </div>
                            <div className="cart-infos">
                                <div>Quantity -</div>
                                <div>{sticker?.quantity}</div>
                            </div>
                        </div>
                    </NavLink>
                    <div onClick={() => setShow(!show)} id="remove-card_threeDots"><i class="fa-solid fa-ellipsis-vertical" /></div>
                    {show && (
                        <OpenModalMenuItem 
                            itemText={'remove'}
                            modalComponent={<DeleteFromCart sticker={sticker}/>}
                        />
                    )}

                </div>       
            </div>
        </>
    )
}