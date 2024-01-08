import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkLoadAllStickers } from "../../redux/stickerReducer"
import { NavLink } from "react-router-dom"
import './Stickers.css'


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
        <div className="container">
            <div className="sticker-cards_container">
                {stickers.map(sticker => {
                    return (
                        <div key={sticker?.id} className="stickers_container">
                            <NavLink to={`/stickers/${sticker?.id}`} >
                                <div id="sticker-images_container">
                                    <img src={sticker?.image} alt={sticker?.title} />
                                </div>
                                <div className="sticker_details">
                                    <div>{sticker?.title}</div>
                                    <div>{sticker?.price}</div>
                                </div>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}