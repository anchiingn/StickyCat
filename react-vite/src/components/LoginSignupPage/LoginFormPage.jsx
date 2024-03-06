import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true)

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  const demo = async (e) => {
    e.preventDefault()
    await dispatch(thunkLogin({ email: 'demo@aa.io', password: 'password' }))
    navigate('/')
  }

  const signup = async (e) => {
    e.preventDefault()
    navigate('/signup')
  }

  return (
    <>
    <div className="log-sign_container">
      <div className="login_container">

        <h1>Sign In</h1>

        {errors.length > 0 &&
          errors.map((message) => <p className="errors" key={message}>{message}</p>)}
        <form onSubmit={handleSubmit} className={["login_form", "form"].join(" ")}>
          <label>
            Email <span style={{color:'var(--color-red)'}}>*</span>
          </label>
            <input className='login_input'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          {errors.email && <p className="errors">*{errors.email}</p>}
          <label>
            Password <span style={{color:'var(--color-red)'}}>*</span>
          </label>
            <input className='login_input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          {errors.password && <p className="errors">*{errors.password}</p>}

          <div style={{display:'flex', justifyContent:'center'}}>
            <button type="submit">Sign In</button>
          </div>

        </form>

      </div>

      <div className="text-before-button_container">
        <span></span>
        <div>Don't have account</div>
        <span></span>
      </div>

      <button onClick={signup} className="login-signup_button">Sign Up</button>
      <button onClick={demo} className="login-signup_button">Demo User</button>

    </div>
    </>
  );
}

export default LoginFormPage;
