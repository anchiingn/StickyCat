import './ExtraPages.css'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { thunkLoadAllStickers } from '../../redux/stickerReducer'
import StickerCards from '../Stickers/StickerCards'

export default function OtherStickers () {
    const dispatch = useDispatch()
    const allStickers = useSelector(state => state?.stickers)

    useEffect(() => {
        dispatch(thunkLoadAllStickers())
    }, [dispatch])

    const stickers = Object.values(allStickers)
    const userSticker = stickers.filter(s => s.ownerId)
    console.log(userSticker)

    return (
        <>
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