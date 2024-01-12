import { useEffect, useState,useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteFromCart from "./DeleteFromCart";

export default function CartStickerCards ({ sticker }) {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false)
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
      };
    
      useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = (e) => {
          if (ulRef.current && !ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };
    
        document.addEventListener("click", closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

    return (
        <>
        <div key={sticker?.id}>
            <NavLink to={`/stickers/${sticker?.stickerId}`} id="cart-sticker-cards_container" className={'navlink'} style={{cursor:'default'}}>
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
            <div onClick={toggleMenu} id="remove-card_threeDots"><i class="fa-solid fa-ellipsis-vertical" /></div>
            {showMenu && (
                <div id="cart-remove">
                    <OpenModalMenuItem 
                        itemText={'remove'}
                        modalComponent={<DeleteFromCart sticker={sticker}/>}
                    />
                </div>
            )}
        </div>       
        </>
    )
}