import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { thunkLoadAllStickers } from "../../redux/stickerReducer"
import { NavLink } from "react-router-dom"
import './Stickers.css'
import StickerCards from "./StickerCards"


export default function AllStickers() {
    const dispatch = useDispatch()
    const allStickers = useSelector(state => state?.stickers)
    // const [hover, setHover] = useState(false)

    // console.log(allStickers)

    useEffect(() => {
        dispatch(thunkLoadAllStickers())
    }, [dispatch])

    const stickers = Object.values(allStickers)

    // if (!allStickers) return null;


    return (
        <>
        <div className="allStickers_container">
        <div style={{fontFamily:'var(--big-font)', fontSize:'30px', letterSpacing:'1.25px'}}>All Sticky Stickers</div>
        <p>This is all sticker from ... to ..., cute .... never boring</p>
            <div className="sticker-cards_container">
                {stickers.map(sticker => {
                    return (
                        <div key={sticker?.id} className="stickers_container">
                            <StickerCards sticker={sticker} />
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}