import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkLoadAllStickers } from "../../redux/stickerReducer"
import './Stickers.css'
import StickerCards from "./StickerCards"
import { NavLink } from "react-router-dom"


export default function AllStickers() {
    const dispatch = useDispatch()
    const allStickers = useSelector(state => state?.stickers)

    useEffect(() => {
        dispatch(thunkLoadAllStickers())
    }, [dispatch])

    const stickers = Object.values(allStickers)


    return (
        <>
        <div className="stickers-toppart_container">
            <NavLink to={'/'} className={'navlink'}>Home</NavLink> 
            /
            <NavLink className={'navlink'}>Explored Stickers</NavLink> 
        </div>

        {/* <div style={{fontFamily:'var(--big-font)', fontSize:'30px', letterSpacing:'1.25px'}}>All Sticky Stickers</div> */}
        <div className="allStickers_container">
            <p>Explore stickers from around the world, where each one is a delightful tiny masterpiece. <br/>Brimming with cuteness and playful charm, they're sure to bring a smile to your day.</p>
            <div className="line-in-between"></div>
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