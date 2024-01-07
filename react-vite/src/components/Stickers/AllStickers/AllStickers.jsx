import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkLoadAllStickers } from "../../../redux/stickerReducer"
import { NavLink } from "react-router-dom"
import './AllStickers.css'


export default function AllStickers() {
    const dispatch = useDispatch()
    const allStickers = useSelector(state => state.stickers)

    useEffect(() => {
        dispatch(thunkLoadAllStickers())
    }, [dispatch])

    const stickers = Object.values(allStickers)

    if (!allStickers) return null;

    return (
        <>
            {stickers.map(sticker => {
                return (
                    <NavLink to={`/stickers/${sticker?.id}`} key={sticker?.id}>
                        <img src={sticker?.image} alt={sticker?.title} />
                        <div>{sticker?.title}</div>
                        <div>{sticker?.price}</div>
                    </NavLink>
                )
            })}
        </>
    )
}