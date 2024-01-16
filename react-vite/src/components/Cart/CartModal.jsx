import { NavLink } from "react-router-dom";
import AllCartStickers from "./AllCartStickers";
import { useState, useEffect, useRef } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { thunkLoadAllCarts } from "../../redux/cardReducer";
import './Cart.css'

function CartModal() {
const [show, setShow] = useState(true)
  const dispatch = useDispatch()
  const ulRef = useRef();
  const fetchCartStickers = useSelector(state => state.carts)
  const user = useSelector(state => state.session.user)


  useEffect(() => {
      dispatch(thunkLoadAllCarts())
  },[dispatch]);

  const cart_stickers = fetchCartStickers ?Object.values(fetchCartStickers) :[];

  
  let total = 0;
  for (let sticker of cart_stickers) {
    if (sticker && sticker?.stickers && sticker?.stickers?.length > 0) {
      total += sticker?.stickers[0]?.price * sticker.quantity;
    }
  }

  total = (total).toFixed(2);
 

  return (
    <>
    {user ?(
        <div id="cart_container">
                <AllCartStickers />
                <div id="total-price">Total: <span>{total}</span></div>
                <button id="checkout" onClick={() => setShow(false)} >
                  {/* <NavLink to="/checkout" className={'navlink'}>Checkout</NavLink> */}
                </button>
              
        </div>
    ) :(
      <div id="cart_container">
        <div style={{marginBottom:'20px'}}>Nothing in cart ... You need to sign in</div>
        <button>
          <NavLink to='/login' className={'navlink'}>Sign In/Up</NavLink>
        </button>
      </div>
    )
  }
    </>
  );
}

export default CartModal;
