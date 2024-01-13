import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { thunkAddToCart, thunkLoadAllCarts } from "../../redux/cardReducer"
import { thunkAddToFavorite, thunkDeleteFromFavorite } from "../../redux/stickerReducer"
import { thunkLoadAllStickers } from "../../redux/stickerReducer"
import CartModal from "../Cart/CartModal"
import './Stickers.css'


export default function StickerCards({ sticker }) {
    const [cart, setCart] = useState(false)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()


    // ------ Add/Remove from Favorite ---------//
    const addToFavorite = async(e) => {
        e.preventDefault()
        await dispatch(thunkAddToFavorite(sticker, sticker?.id))
        await dispatch(thunkLoadAllStickers())
    }

    const removeFromFavorite = async(e) => {
        e.preventDefault()
        await dispatch(thunkDeleteFromFavorite(sticker?.favorited[0]?.id))
        await dispatch(thunkLoadAllStickers())
    }
 

    // ------ Add To Cart ---------//
    const addToCart = async(e) => {
        e.preventDefault()

        setCart(true)

        await dispatch(thunkAddToCart(sticker, sticker?.id))
        await dispatch(thunkLoadAllCarts())
    }

    return (
        <>
            <NavLink to={`/stickers/${sticker?.id}`} className={'navlink'}>
                <div className="sticker-images_container">
                    <img src={sticker?.image} alt={sticker?.title}/>
                </div>
                <div className="sticker-details_top">
                    <div>{sticker?.title}</div>
                    <div>${sticker?.price}</div>
                </div>
            </NavLink>
            {user && sticker?.ownerId !== user.id ? (
            <div className="sticker-details_bottom">
                <div>
                    <button id="addToCart" onClick={addToCart} className="buttons"><i className="fa-solid fa-cart-shopping"/></button>
                        {cart && (
                        <div id="cart-modal">
                        <div id="cart-top">
                            <div style={{fontWeight:'bold'}}>My Cart -</div>
                            <button onClick={() => setCart(false)} className="buttons"><i class="fa-solid fa-xmark" style={{fontSize:'20px', color:'var(--color-black)'}}/></button>
                        </div>
                        <div>
                            <CartModal />
                        </div>
                        </div>
                        )}
                </div>
                <div>
                        <>
                            {sticker?.favorited?.length === 0 ?(
                            <div>
                                <button onClick={addToFavorite} className="buttons"><i className="fa-regular fa-heart"/></button>
                            </div>
                            ): (
                            <div>
                                <button onClick={removeFromFavorite} className="buttons"><i className="fa-solid fa-heart" style={{color:'var(--color-red)'}}/></button>
                            </div>
                            )}
                        </>
                </div>
            </div>
            ) :(
                <div style={{margin:'15px'}}></div>
            )}

        </>
    )
}