import { thunkDeleteFromCart, thunkAddToCart, thunkLoadAllCarts } from "../../redux/cardReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";


const CartIcon = () => {
    const dispatch = useDispatch();
    const cartRef = useRef()
    const loadStickerCarts = useSelector(state => state.carts);
    const user = useSelector (state => state.session.user)
    const [ showCart, setShowCart ] = useState(false)

    
    useEffect(() => {
        dispatch(thunkLoadAllCarts())
    }, [dispatch])

    const stickerCarts = Object.values(loadStickerCarts)

    let quantity = 0
    for (let sticker of stickerCarts) {
        if (user) {
            quantity += sticker.quantity
        }
    }


    const toggleCart = (e) => {
        e.stopPropagation(); 
        setShowCart(!showCart)
    }

    useEffect(() => {
        if (!showCart) return;
    
        const closeMenu = (e) => {
          if (cartRef.current && !cartRef.current.contains(e.target)) {
            setShowCart(false);
          }
          
        };
    
        document.addEventListener("click", closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
      }, [showCart]);
      
      

    return (
        <div className="cartIcon_container">
            <i className="fa-solid fa-cart-shopping"></i>
            <div className="cart_length_number">{quantity}</div>
        </div>
    )
}

export default CartIcon