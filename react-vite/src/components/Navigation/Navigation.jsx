import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useState, useEffect, useRef } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { thunkLoadAllCarts, thunkRemoveAllSticker } from "../../redux/cardReducer";
import AllCartStickers from "../Cart/AllCartStickers";



function Navigation() {
  const [show, setShow] = useState(false)
  const ulRef = useRef();
  const dispatch = useDispatch()
  const fetchCartStickers = useSelector(state => state.carts)
  const fetchStickers = useSelector(state => state.stickers)
  const user = useSelector (state => state.session.user)
  
  const navigate = useNavigate()

  useEffect(() => {
      dispatch(thunkLoadAllCarts())
  },[dispatch]);

  const cart_stickers = Object.values(fetchCartStickers);
  const stickers = Object.values(fetchStickers)

  let quantity = 0
  for (let sticker of cart_stickers) {
    if (user && sticker.userId === user.id) {
      quantity += sticker?.quantity
    }
  }

  // -------- Close Cart When Click Outside --------//
  const toggleMenu = (e) => {
    e.stopPropagation(); 
    setShow(!show);
  };

  useEffect(() => {
    if (!show) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [show]);


  // -------- Total Price --------//
  let total = 0;
  for (let sticker of cart_stickers) {
    if (sticker && sticker?.stickers && sticker?.stickers?.length > 0 && sticker?.userId === user?.id) {
      total += sticker?.stickers[0]?.price * sticker.quantity;
    }
  }
  total = (total).toFixed(2); 


  // -------- Checkout --------//
  const getCheckout = async () => {
    if (cart_stickers.length >= 1) {
      await dispatch(thunkRemoveAllSticker())
      await dispatch(thunkLoadAllCarts())

      navigate('/thank-you-for-your-purchased')
    }
  }

  
  return (
    <div className="container">

        <div id="nav_container">
          <div id="logo_container">
            {/* <NavLink to="/" className="navlink"><img src="https://stickycat.s3.us-east-2.amazonaws.com/Screen_Shot_2024-01-17_at_3.15.46_PM.png" alt="" style={{width:'35px'}}/></NavLink> */}
            <NavLink to="/" className="navlink" id="logo-name">StickyCat</NavLink>
          </div>
          
          <div id="nav-link_container">
            {/* <NavLink to="/how-it-work" className="navlink">How It Work</NavLink> */}
            <NavLink to="/explored-stickers" className="navlink">Explored Stickers</NavLink>
            <NavLink to="/launch-sticker" className="navlink" >Launch Sticker</NavLink>
          </div>


          <div id='profile-cart_container'>
            <div>
              <ProfileButton />
            </div>

            <div id="cart-container">
              <div id="cart-modal_container"> 
                <button onClick={toggleMenu} className="buttons">
                  <i className="fa-solid fa-cart-shopping" style={{fontSize:'20px'}}/>
                  <div id="cart-stickers_length" style={{cursor:'pointer'}}>{quantity}</div>
                </button>
                
              </div>

              {show && (
                <div id="cart-modal" ref={ulRef}>

                  <div id="cart-top">
                    <div style={{fontWeight:'bold'}}>My Cart -</div>
                    <button onClick={toggleMenu} className="buttons"><i className="fa-solid fa-xmark" style={{fontSize:'20px', color:'var(--color-black)'}}/></button>
                  </div>

                  <div id="cart-stickers_container">
                  {user ? (
                    <>
                      <div id="cart_container">
                          <AllCartStickers />
                          <div id="total-price">Total: <span>${total}</span></div>
                      </div>

                      <div id="checkout_container">
                        <button id="checkout" onClick={toggleMenu}>
                          <div onClick={getCheckout}>Checkout</div>
                        </button>
                      </div>
                    </>
                  ) :(
                    <div id="cart_container">
                      <div style={{marginBottom:'20px'}}>Nothing in cart ... You need to sign in</div>
                      <button>
                        <NavLink to='/login' className={'navlink'}>Sign In/Up</NavLink>
                      </button>
                    </div>
                  )}
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
    </div>
  );
}

export default Navigation;
