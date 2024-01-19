import { NavLink } from "react-router-dom";

export default function Thankyou () {
    return (
        <>
            <h1>Thank you for your purchased</h1>
            <NavLink to={'/explored-stickers'} className={'navlink'}>Explored More Stickers</NavLink>
        </>
    )
}