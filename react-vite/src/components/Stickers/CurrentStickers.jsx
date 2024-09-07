import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { thunkLoadCurrentStickers } from "../../redux/stickerReducer"
import { NavLink } from "react-router-dom"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import DeleteSticker from "./DeleteSticker"
import AddToFavorite from "../Favorites/AddToFavorite"
import AddToCart from "../Cart/AddToCart"
import StickerCards from "./StickerCards"

export default function CurrentStickers() {
    const dispatch = useDispatch()
    const allStickers = useSelector(state => state.stickers)
    const user = useSelector(state => state.session?.user)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(thunkLoadCurrentStickers())
        setTimeout(() => {
            setIsLoading(false)
        }, 200)
    }, [dispatch])

    const stickers = Object.values(allStickers)
    stickers.sort((a, b) => b.id - a.id)

    console.log(stickers)

    return (
        <>
            {isLoading ? (
                <h2 style={{ margin: 'auto' }}>Loading...</h2>
            ) : (
                <>
                    {user && (
                        <>
                            <div className="stickers-toppart_container">
                                <span>My Stickers</span> <span>/</span>
                            </div>

                            <div style={{ display:'flex', justifyContent:'center'}}>
                                <div className="allStickers_container">
                                    {stickers.length === 0 ? (
                                        <>
                                            <div className="user-stickers_container">
                                                {/* <div style={{fontFamily:'var(--big-font)', fontSize:'30px', letterSpacing:'1.25px'}}>My Sticky Stickers</div> */}
                                                <p className="user-paragraph">Oops! Your sticker collection seems a bit bare. Let&apos;s create a charming masterpiece together!</p>
                                                <div className="line-in-between"></div>
                                                <button className="user-button">
                                                    <NavLink to={'/new-sticker'} className={'navlink'} style={{ padding: '20px 40px', borderRadius: '50px' }}>Create Sticker</NavLink>
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* <div style={{fontFamily:'var(--big-font)', fontSize:'30px', letterSpacing:'1.25px'}}>My Sticky Stickers</div> */}
                                            {/* <div className="line-in-between"></div> */}
                                            <div className="sticker-cards_container">
                                                {stickers.map(sticker => {

                                                    // -------------------  Star Rating  ------------------- //
                                                    let starRating = 0;
                                                    if (sticker.reviews && sticker.reviews.length >= 1) { //check if it their is review before iteration
                                                        for (let review of sticker.reviews) {
                                                            starRating += (review?.star) / sticker.reviews.length;
                                                        }
                                                    }

                                                    if (user?.id === sticker?.ownerId) {
                                                        return (
                                                            <div key={sticker?.id} className="stickers_container">
                                                                <StickerCards sticker={sticker} />
                                                                <AddToCart sticker={sticker} />
                                                                <div className="sticker-details_bottom">
                                                                    <NavLink to={`/${sticker.id}/edit-sticker`} className={'navlink'}>Edit</NavLink>
                                                                    <div style={{ listStyle: 'none', cursor: 'pointer' }}>
                                                                        <OpenModalMenuItem
                                                                            itemText='Delete'
                                                                            modalComponent={<DeleteSticker sticker={sticker} />}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <AddToFavorite sticker={sticker} />
                                                            </div>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </>
                                    )}
                                </div>

                            </div>
                        </>
                    )}
                </>
            )}
        </>
    )
}