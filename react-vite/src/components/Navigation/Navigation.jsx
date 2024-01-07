import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import AllCartStickers from "../Carts/AllCartStickers";

function Navigation() {

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/new">new sticker</NavLink>
      </li>
      <li>
        <button>cart</button>
        <div style={{backgroundColor:'blue', width:'10em',height:'100vh', position:'relative',top:'00px', left:'10empx'}}>
          <div>hi</div>
          <AllCartStickers />
        </div>
      </li>
      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
