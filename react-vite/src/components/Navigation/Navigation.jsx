import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import AllCartStickers from "../Carts/AllCartStickers";
import { useState } from "react";

function Navigation() {
  const [show, setShow] = useState(false)

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/new">new sticker</NavLink>
      </li>
      <li>
        <button onClick={e => setShow(!show)}>cart</button>
        {show && (
          <div style={{backgroundColor:'blue', width:'10em',height:'100vh', position:'sticky',top:'0px'}}>
            <div>hi</div>
            <AllCartStickers />
          </div>
        )}
      </li>
      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
