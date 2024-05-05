import ProfileButton from "./ProfileButton";
import CartIcon from "./CartIcon";
import Search from "./Search/Search";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadAllCarts, thunkRemoveAllSticker } from "../../redux/cardReducer";
import AllCartStickers from "../Cart/AllCartStickers";
import "./Navigation.css";



function Navigation() {


  return (
    <>
      <div className="navigator_container">

        {/* navigator_wrapper_left */}
        <div className="navigator_wrapper_left">
          <NavLink to="/" className="logo_name navlink">StickyCat</NavLink>
          <Search />
        </div>

        {/* navigator_wrapper_middle */}
        <div className="navigator_wrapper_middle">
          <NavLink to="/explored-stickers" className="navlink">Explore Stickers</NavLink>
          <NavLink to="/launch-sticker" className="navlink">Landing Sticker</NavLink>
        </div>

        {/* navigator_wrapper_right */}
        <div className="navigator_wrapper_right">
          <ProfileButton />
          <CartIcon />
        </div>
      </div>
    </>
  );
}

export default Navigation;
