import { NavLink } from "react-router-dom"
import './Footer.css'

export default function Footer () {
    return (
        <>
            <div id='footer-mainpage_container'>
                {/* <img src="https://stickycat.s3.us-east-2.amazonaws.com/Landing_Page_.png" alt="" /> */}
                <div id="footer-top">
                    <div>StickyCat</div>
                    <div id="about-link">
                        <NavLink to={'https://github.com/anchiingn'} className={'navlink'}><i className="fa-brands fa-square-github"></i></NavLink>
                        <NavLink to={'https://www.linkedin.com/in/anchinguyen/'} className={'navlink'}><i className="fa-brands fa-linkedin"></i></NavLink>
                    </div>
                </div>
                <div id="footer-detail">
                        
                </div>
            </div> 
        </>
    )
}