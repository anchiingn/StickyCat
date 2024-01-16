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
  const user = useSelector (state => state.session.user)

  useEffect(() => {
      dispatch(thunkLoadAllCarts())
  },[dispatch]);

  const cart_stickers = fetchCartStickers ?Object.values(fetchCartStickers) :[];

  let quantity = 0
  for (let sticker of cart_stickers) {
    if (user && sticker.userId === user.id) {
      console.log(sticker)
      quantity += sticker?.quantity
    }
  }

  // -------- Close Cart When Click Outside --------//
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShow(!show);
  };


  // useEffect(() => {
  //   if (!show) return;

  //   const closeMenu = (e) => {
  //     if (ulRef.current && !ulRef.current.contains(e.target)) {
  //       setShow(false);
  //     }
  //   };

  //   document.addEventListener("click", closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [show]);


  return (
    <div className="container">

        <div id="nav_container">

          <div id="logo_container">
            <NavLink to="/" className="navlink"><img src="https://stickycat.s3.us-east-2.amazonaws.com/Landing_Page_.png" alt="" style={{width:'35px'}}/></NavLink>
            <NavLink to="/" className="navlink" id="logo-name">StickyCat</NavLink>
          </div>
          
          <div id="nav-link_container">
            <NavLink to="/explored-stickers" className="navlink">Explored Stickers</NavLink>
            {/* <NavLink to="/how-it-work" className="navlink">How It Work</NavLink> */}
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
