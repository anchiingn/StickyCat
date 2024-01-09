import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { NavLink, useNavigate } from "react-router-dom";
import { thunkLoadCurrentStickers } from "../../redux/stickerReducer";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  const goMySticker = async(e) => {
    await dispatch(thunkLoadCurrentStickers())
    navigate('/my-stickers')
  }

  return (
    <>
    {user ? (
      <>
        <button onClick={toggleMenu}>
          <i className="fas fa-user-circle" />
        </button>
        {showMenu && (
          <ul className={"profile-dropdown"} ref={ulRef}>
              <>
                <li>{user.username}</li>
                <li>{user.email}</li>
                {user && (
                  <>
                  <button onClick={goMySticker}>my stickers</button>
                  {/* <NavLink to="/my-stickers" className="navlink">My Stickers</NavLink> */}
                  <NavLink to="/my-favorite-stickers" className="navlink">My Favorite Stickers</NavLink>
                  </>
                )}
                <li>
                  <button onClick={logout}>Log Out</button>
                </li>
              </>
          </ul>
        )}
      </>
    ) : (
      <NavLink to="/login" className="navlink">Sign In/Up</NavLink>
    )
  }
    </>
  );
}

export default ProfileButton;
