import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import { thunkSignup } from "../../redux/session";

import './SignupForm.css'

function SignupFormPage() {
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

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
 
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
    console.log(errors)
  };

  const signin = async (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <>
    <div className="container">
      <div className="signup_container">
        
        <h1>Sign Up</h1>
        {/* {errors.server && <p className="errors">*{errors.server}</p>} */}
        <form onSubmit={handleSubmit} className={["signup_form", "form"].join(" ")}>
          <div className="firstname-lastname">
          <label>
            Firstname
          </label>
            <input 
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />, 

            <label>
            Lastname
            </label>
            <input 
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <label>
            Email
          </label>
            <input 
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          {errors.email && <p className="errors">*{errors.email}</p>}

          <label>
            Username
          </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          {errors.username && <p className="errors">*{errors.username}</p>}

          <label>
            Password
          </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          {errors.password && <p className="errors">*{errors.password}</p>}

          <label>
            Confirm Password
          </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          {errors.confirmPassword && <p className="errors">*{errors.confirmPassword}</p>}

          <button type="submit">Sign Up</button>
        </form>

      </div>

        <button onClick={signin} className="login-signup_button">Sign In</button>

    </div>
    </>
  );
}

export default SignupFormPage;
