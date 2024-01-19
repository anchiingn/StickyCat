import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { NavLink, useNavigate } from "react-router-dom";

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
    navigate('/')
  };


  return (
    <>
    {user ? (
      <>
        <button onClick={toggleMenu} className="buttons">
          <i className="fas fa-user-circle" style={{fontSize:'25px', marginRight:'10px'}}/>
        </button>
        {showMenu && (
          <ul className={"profile-dropdown"} ref={ulRef}>
              <>
                <li>{user.username}</li>
                <li>{user.email}</li>
                <div className="profile-underline"></div>
                {user && (
                  <>
                  <div id="profile-navlink">
                    <NavLink to="/my-stickers" className="navlink">My Stickers</NavLink>
                    <NavLink to="/my-favorite-stickers" className="navlink">My Favorite Stickers</NavLink>
                  </div>
                  <div className="profile-underline"></div>
                  </>
                )}
                <button onClick={logout}>Log Out</button>
              </>
          </ul>
        )}
      </>
    ) : (
      <NavLink to="/login" className="navlink" style={{color:'var(--color-red)', marginRight:'5px'}}>Sign In/Up</NavLink>
    )
  }
    </>
  );
}

export default ProfileButton;
