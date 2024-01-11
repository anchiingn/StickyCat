import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import AllCartStickers from "../Carts/AllCartStickers";
import { useState, useEffect, useRef } from "react";
import {  useSelector } from "react-redux";

function Navigation() {
  const [show, setShow] = useState(false)
  const user = useSelector(state => state.session.user)
  const stickers = useSelector(state => state.carts)
  const ulRef = useRef();

  //need to add cart to sticker in backend
  const s = Object.values(stickers)
  console.log(s)

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShow(!show);
  };

  useEffect(() => {
    if (!show) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    console.log

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
        <div>Explore StickyCat</div>
        <div>How It Work</div>
        {user && (
          <NavLink to="/new-sticker" className="navlink" >Launch Stickers</NavLink>
        )}
      </div>

      <div id='profile-cart'>
        <div>
          <ProfileButton />
        </div>

        <div>
          <button onClick={toggleMenu}><i className="fa-solid fa-cart-shopping"></i></button>
          <div></div>
          {show && (
            <div id="cart-modal">
              <button onClick={toggleMenu}>x</button>
              <AllCartStickers />
              <button>Checkout</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Navigation;
