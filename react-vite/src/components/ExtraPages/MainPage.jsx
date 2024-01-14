import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkLoadAllStickers } from "../../redux/stickerReducer"
import StickerCards from "../Stickers/StickerCards"
import { NavLink } from "react-router-dom"
import './MainPage.css'

export default function MainPage () {
    const dispatch = useDispatch()
    const allStickers = useSelector(state => state?.stickers)

    useEffect(() => {
        dispatch(thunkLoadAllStickers())
    }, [dispatch])

    const stickers = Object.values(allStickers)
    const s = stickers.slice(0,3)

    return (
        <>
            <div id='mainpage_container'>
                <img src="https://stickycat.s3.us-east-2.amazonaws.com/Landing_Page_+2.png" alt="" />
                <div id='mainpage-title-text'>
                    <span>STICKY</span>
                    <span>STICKERS</span>
                </div>
            </div>
            <div className='yellow_container'>
                <div> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS </div>
            </div>

            <div id='about_container'>
                <div id='about-image_container'>
                    <img src="https://stickycat.s3.us-east-2.amazonaws.com/IMG_2901+2.jpg" alt="" />
                </div>
                <div>
                    <div id='about-title_container'>
                        <div>ABOUT STICKERCAT</div>
                        <div>ABOUT STICKERCAT</div>
                    </div>
                    
                    <div id='about-texts_container'>
                        <p>
                            Welcome to StickyCat, where creativity and cuteness collide! We're the platform showcasing adorable, whimsical stickers that spread joy far and wide. StickyCat isn't just about stickers; it's a magical realm where creators and brands craft enchanting collections, aiming to sprinkle the world with sweetness, one sticker at a time.
                        </p>
                        <p>
                        At StickyCat, creators bring their playful and cute designs to life. Once their creations are ready, we handle the entire sticker-making journey – from production and manufacturing to the enchanting delivery of these lovable stickers to your doorstep. Join us at StickyCat, where each sticker is a delightful messenger of joy, spreading happiness wherever it goes!
                        </p>
                    </div>
                </div>
            </div>

            <div className='yellow2_container'>
                <div> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS </div>
            </div>

            <div id='explored-stickers_container'>
                <div>EXPLORED STICKERS</div>
                <div id='explored-stickers_cards'>
                    <div id="sticker-cards">
                        {s.map(sticker => {
                            return (
                                <div key={sticker?.id} className="stickers_container">
                                    <StickerCards sticker={sticker} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <NavLink to={'/explored-stickers'} className={'navlink'}>- VIEW ALL -</NavLink>
            </div>

            <div id='launch-sticker_container'>
                <div>LAUNCH YOUR STICKER</div>
            </div>

            <div id='footer-mainpage_container'>

            </div>
        </>
    )
}