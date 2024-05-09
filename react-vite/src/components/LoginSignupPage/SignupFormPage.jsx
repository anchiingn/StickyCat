import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import { thunkSignup } from "../../redux/session";

import './SignupForm.css'

export default function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   return setErrors({
    //     confirmPassword:
    //       "Confirm Password field must be the same as the Password field",
    //   });
    // }
 
    // if (!email.includes('@')) {
    //   return setErrors({
    //     email:
    //       "Not a valid email",
    //   });
    // }

    const serverResponse = await dispatch(
      thunkSignup({
        firstname,
        lastname,
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  const signin = async (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <>
    <div className="log-sign_container">
      <div className="signup_container">
        
        <h1>Sign Up</h1>
        {/* {errors.server && <p className="errors">*{errors.server}</p>} */}
        <form onSubmit={handleSubmit} className={["signup_form", "form"].join(" ")}>
          <div className="firstname-lastname">
          <label>
            Firstname <span style={{color:'var(--color-red)'}}>*</span>
          </label>
            <input 
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />

            <label>
            Lastname <span style={{color:'var(--color-red)'}}>*</span>
            </label>
            <input 
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <label>
            Email <span style={{color:'var(--color-red)'}}>*</span>
          </label>
            <input 
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          {errors.email && <p className="errors">*{errors.email}</p>}

          <label>
            Username <span style={{color:'var(--color-red)'}}>*</span>
          </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          {errors.username && <p className="errors">*{errors.username}</p>}

          <label>
            Password <span style={{color:'var(--color-red)'}}>*</span>
          </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          {/* {errors.password && <p className="errors">*{errors.password}</p>} */}
          <div className={password.length > 8 ?'color-green' :(errors.password) ?'color-red' :''}><i className="fa-regular fa-circle-check"></i> A minimum of 8 characters</div>
          <div className={password.match(/[0-9]/) ?'color-green' :(errors.password) ?'color-red' :''}><i className="fa-regular fa-circle-check"></i> Include at least one number</div>
          <div className={password.match(/[A-Z]/) ?'color-green' :(errors.password) ?'color-red' :''}><i className="fa-regular fa-circle-check"></i> Include at least one uppercase letter</div>
          <div className={password.match(/[a-z]/) ?'color-green' :(errors.password) ?'color-red' :''}><i className="fa-regular fa-circle-check"></i> Include at least one lower letter</div>

          {/* <label>
            Confirm Password <span style={{color:'var(--color-red)'}}>*</span>
          </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          {errors.confirmPassword && <p className="errors">*{errors.confirmPassword}</p>} */}


          <div style={{display:'flex', justifyContent:'center'}}>
            <button type="submit">Sign Up</button>
          </div>
        </form>

      </div>

      <div className="text-before-button_container">
        <span></span>
        <div>Already have an account</div>
        <span></span>
      </div>

      <button onClick={signin} className="login-signup_button" style={{marginBottom:'100px'}}>Sign In</button>

    </div>
    </>
  );
}

