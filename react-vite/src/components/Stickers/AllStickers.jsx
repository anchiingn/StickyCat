import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { thunkLoadAllStickers } from "../../redux/stickerReducer"
import { NavLink } from "react-router-dom"
import './css/AllStickers.css'


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
        <div className="">
        <div style={{fontFamily:'var(--big-font)', fontSize:'30px', letterSpacing:'1.25px'}}>All Sticky Stickers</div>
        <p>This is all sticker from ... to ..., cute .... never boring</p>
            <div className="sticker-cards_container">
                {stickers.map(sticker => {
                    return (
                        <div key={sticker?.id} className="stickers_container">
                            <NavLink to={`/stickers/${sticker?.id}`} className={'navlink'}>
                                <div id="sticker-images_container">
                                    <img src={sticker?.image} alt={sticker?.title} />
                                </div>
                                <div className="sticker_details">
                                    <div>{sticker?.title}</div>
                                    <div>${sticker?.price}</div>
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