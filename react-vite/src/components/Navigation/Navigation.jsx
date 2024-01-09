import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import AllCartStickers from "../Carts/AllCartStickers";
import { useState } from "react";

function Navigation() {
  const [show, setShow] = useState(false)

  return (
    <div id="nav_container">
      <div id="logo_container">
          <div id="logo-name">StickyCat</div>
      </div>
      
      <div id="nav-link_container">
        <NavLink to="/" className="navlink">Home</NavLink>
        <NavLink to="/new-sticker" className="navlink">new sticker</NavLink>
      </div>

      <div id='profile-cart'>
        <div>
          <ProfileButton />
        </div>

        <div>
          <button onClick={e => setShow(!show)}><i className="fa-solid fa-cart-shopping"></i></button>
          {show && (
            <div id="cart-modal">
              <div>hi</div>
              <AllCartStickers />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Navigation;
