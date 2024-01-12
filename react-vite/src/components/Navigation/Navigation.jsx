import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import AllCartStickers from "../Carts/AllCartStickers";
import { useState, useEffect, useRef } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { thunkLoadAllCarts } from "../../redux/cardReducer";

function Navigation() {
  const [show, setShow] = useState(false)
  // const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const ulRef = useRef();
  const fetchCartStickers = useSelector(state => state.carts)

  useEffect(() => {
      dispatch(thunkLoadAllCarts())
  },[dispatch]);

  const cart_stickers = fetchCartStickers ?Object.values(fetchCartStickers) :[];

  let total = 0;
  let price = 0;
  let quantity = 0;
  for (let sticker of  cart_stickers) {
    if (sticker && sticker.length > 0) {
      price += sticker?.stickers[0]?.price
      quantity += sticker.quantity
      total = (price * quantity).toFixed(2)
    }
  }

  // -------- Close Cart When Click Outside --------//
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
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




  return (
    <div id="nav_container">
      <div id="logo_container">
        {/* <button id="logo-name" onClick={goBackHome}> StickyCat</button> */}
        <NavLink to="/" className="navlink" id="logo-name"><i className="fa-solid fa-cat"></i> StickyCat</NavLink>
      </div>
      
      <div id="nav-link_container">
        <NavLink to="/explored-stickers" className="navlink">Explored Stickers</NavLink>
        {/* <NavLink to="/how-it-work" className="navlink">How It Work</NavLink> */}
        <NavLink to="/launch-stickers" className="navlink" >Launch Stickers</NavLink>
      </div>

      <div id='profile-cart'>
        <div>
          <ProfileButton />
        </div>

        <div>
          <button onClick={toggleMenu}><i className="fa-solid fa-cart-shopping"></i></button>
          <div>{cart_stickers.length}</div>
          {show && (
            <div id="cart-modal">
              <button onClick={toggleMenu}>x</button>
              <AllCartStickers />
              <div>Total: {total}</div>
              <button onClick={toggleMenu}>
                <NavLink to="/checkout">Checkout</NavLink>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Navigation;
