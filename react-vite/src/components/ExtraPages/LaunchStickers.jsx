import { NavLink } from 'react-router-dom'
import NewSticker from '../Stickers/NewSticker'
import './ExtraPages.css'

export default function LaunchStickers () {
    return (
        <>
        <NavLink to="/new-sticker">
            Create your own Sticky Sticker
        </NavLink>
        </>
    )
}