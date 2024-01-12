import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import AllCartStickers from "../Cart/AllCartStickers";
import { useState, useEffect, useRef } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { thunkLoadAllCarts } from "../../redux/cardReducer";
import CartModal from "../Cart/CartModal";

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
    <div className="container">

        <div id="nav_container">

          <div id="logo_container">
            <img src="./src/images/logo.png" alt="" style={{width:'35px'}}/>
            <NavLink to="/" className="navlink" id="logo-name">StickyCat</NavLink>
          </div>
          
          <div id="nav-link_container">
            <NavLink to="/explored-stickers" className="navlink">Explored Stickers</NavLink>
            {/* <NavLink to="/how-it-work" className="navlink">How It Work</NavLink> */}
            <NavLink to="/launch-stickers" className="navlink" >Launch Stickers</NavLink>
          </div>

          <div id='profile-cart_container'>
            <div>
              <ProfileButton />
            </div>

            <div>
              <div id="cart-modal_container"> 
                <button onClick={toggleMenu} className="buttons" yh><i className="fa-solid fa-cart-shopping" style={{fontSize:'20px'}}/></button>
                <div id="cart-stickers_length">{cart_stickers.length}</div>
              </div>
              {show && (
                <div id="cart-modal">
                  <div id="cart-top">
                    <div style={{fontWeight:'bold'}}>My Cart -</div>
                    <button onClick={toggleMenu} className="buttons"><i class="fa-solid fa-xmark" style={{fontSize:'20px', color:'var(--color-black)'}}/></button>
                  </div>
                  <div>
                    <CartModal />
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
