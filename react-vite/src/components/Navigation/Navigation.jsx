import { NavLink, Navigate, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import AllCartStickers from "../Carts/AllCartStickers";
import { useState } from "react";
import { thunkLoadAllStickers, thunkLoadCurrentStickers } from "../../redux/stickerReducer";
import { useDispatch } from "react-redux";

function Navigation() {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goBackHome = async(e) => {
    await dispatch(thunkLoadAllStickers())
    navigate('/')
  }


  return (
    <div id="nav_container">
      <div id="logo_container">
        <button id="logo-name" onClick={goBackHome}> StickyCat</button>
        {/* <NavLink to="/" className="navlink" id="logo-name"><i className="fa-solid fa-cat"></i> StickyCat</NavLink> */}
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
