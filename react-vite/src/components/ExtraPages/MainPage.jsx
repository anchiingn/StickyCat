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
    const s = stickers.slice(0,4)


    return (
        <>
            <div id='mainpage_container'>
                <img src="https://stickycat.s3.us-east-2.amazonaws.com/Screen_Shot_2024-01-17_at_3.15.46_PM+1.png" alt="" />
                <div id='mainpage-title-text'>
                    <span>STICKY</span>
                    <span>STICKERS</span>
                </div>
                <div id='mainpage-title-text-v2'>
                    <span>STICKY</span>
                    <span>STICKERS</span>
                </div>
            </div>
            <div className='yellow_container'>
                <div> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS</div>
            </div>

            <div id='about_container'>
                <div id='about-image_container'>
                    <img src="https://stickycat.s3.us-east-2.amazonaws.com/IMG_2901+2.jpg" alt="" />
                </div>
                <div id="about-info">
                    <div id='about-title_container'>
                        <div>ABOUT STICKYCAT</div>
                        <div>ABOUT STICKYCAT</div>
                    </div>
                    
                    <div id='about-texts_container'>
                        <p>
                            Welcome to StickyCat, where creativity and cuteness collide! We&apos;re the platform showcasing adorable, whimsical stickers that spread joy far and wide. StickyCat isn&apos;t just about stickers; it&apos;s a magical realm where creators and brands craft enchanting collections, aiming to sprinkle the world with sweetness, one sticker at a time.
                        </p>
                        <p>
                            Here at StickyCat, creators bring their playful designs to life, and once ready, we handle everything from production to the enchanting delivery of these lovable stickers. Join us, where each sticker becomes a delightful messenger, spreading happiness wherever it goes!
                        </p>
                    </div>
                </div>
            </div>

            <div className='yellow2_container'>
                <div> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS <span>-</span> STICKERS</div>
            </div>

            <div id='explored-stickers_container'>
                <div>EXPLORE STICKERS</div>
                <div className="stickers_card_wrapper">
                    <div id='explored-stickers_cards'>
                            {s.map(sticker => {
                                return (
                                    <div key={sticker?.id} className="stickers_container">
                                        <StickerCards sticker={sticker} />
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <NavLink to={'/explored-stickers'} className={'navlink view'}>- VIEW ALL -</NavLink>
            </div>

            <div id='launch-sticker_container'>
                <div >LAUNCH YOUR STICKER</div>
                <p>Let&apos;s craft your stickers together! With StickyCat, we&apos;ll collaborate to bring your designs to life, ensuring a personalized, delightful sticker collection for you and your fans. Ready to embark on this creative journey?</p>
                <div id="black-line"></div>
                <NavLink to={'/launch-sticker'} className={'navlink'}>Let Start!</NavLink>
            </div>

        </>
    )
}