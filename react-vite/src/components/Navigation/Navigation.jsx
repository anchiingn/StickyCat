import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useState, useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { thunkLoadAllCarts } from "../../redux/cardReducer";
import CartModal from "../Cart/CartModal";

function Navigation() {
  const [show, setShow] = useState(false)
  // const user = useSelector(state => state.session.user)
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




  return (
    <div className="container">

        <div id="nav_container">

          <div id="logo_container">
            <NavLink to="/" className="navlink"><img src="https://stickycat.s3.us-east-2.amazonaws.com/Landing_Page_.png" alt="" style={{width:'35px'}}/></NavLink>
            <NavLink to="/" className="navlink" id="logo-name">StickyCat</NavLink>
          </div>
          
          <div id="nav-link_container">
            <NavLink to="/how-it-work" className="navlink">How It Work</NavLink>
            <NavLink to="/explored-stickers" className="navlink">Explored Stickers</NavLink>
            <NavLink to="/launch-sticker" className="navlink" >Launch Sticker</NavLink>
          </div>

          <div id='profile-cart_container'>
            <div>
              <ProfileButton />
            </div>

            <div>
              <div id="cart-modal_container"> 
                <button onClick={toggleMenu} className="buttons">
                  <i className="fa-solid fa-cart-shopping" style={{fontSize:'20px'}}/>
                  <div id="cart-stickers_length" style={{cursor:'pointer'}}>{quantity}</div>
                </button>
                
              </div>
              {show && (
                <div id="cart-modal">

                  <div id="cart-top">
                    <div style={{fontWeight:'bold'}}>My Cart -</div>
                    <button onClick={toggleMenu} className="buttons"><i className="fa-solid fa-xmark" style={{fontSize:'20px', color:'var(--color-black)'}}/></button>
                  </div>

                  <div>
                    <CartModal />
                  </div>

                  {user && (
                    <div id="checkout_container">
                      <button id="checkout" onClick={toggleMenu}>
                        <NavLink to="/checkout" className={'navlink'}>Checkout</NavLink>
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>

          </div>

        </div>
    </div>
  );
}

export default Navigation;
