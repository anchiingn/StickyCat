import { NavLink } from "react-router-dom";

export default function Thankyou () {
    return (
        <>
        <div id="thank-you-message_container">
            <h1>Thank you for your purchased</h1>
            <div>
                <NavLink to={'/'} className={'navlink'}>Back to Home</NavLink>
                or
                <NavLink to={'/explored-stickers'} className={'navlink'}>Explore More Stickers</NavLink>
            </div>
        </div>
        </>
    )
}