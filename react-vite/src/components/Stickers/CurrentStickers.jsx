import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkLoadCurrentStickers } from "../../redux/stickerReducer"
import { NavLink } from "react-router-dom"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import DeleteSticker from "./DeleteSticker"
import { thunkLoadAllReviews } from "../../redux/reviewReducer"

export default function CurrentStickers() {
    const dispatch = useDispatch()
    const allStickers = useSelector(state => state.stickers)
    const user = useSelector(state => state.session?.user)
    
    useEffect(() => {
        dispatch(thunkLoadCurrentStickers())
    }, [dispatch])

    const stickers = Object.values(allStickers)

console.log(stickers)
    return (
        <>
        {user && (
            <div className="allStickers_container">
                <div style={{fontFamily:'var(--big-font)', fontSize:'30px', letterSpacing:'1.25px', borderBottom:'1.5px solid var(--color-black)'}}>My Sticky Stickers</div>
                {stickers.length === 0 ?(
                    <div>Opps... you have no sticker, let create one</div>
                ) :(
                    <div className="sticker-cards_container"> 
                    {stickers.map(sticker => {
                        if (user?.id === sticker?.ownerId) {
                            return (
                            <div key={sticker?.id} className="stickers_container">
                                <NavLink to={`/stickers/${sticker?.id}`} className={'navlink'}>
                                    <div className="sticker-images_container">
                                        <img src={sticker?.image} alt={sticker?.title} />
                                    </div>
                                    <div className="sticker-details_top">
                                        <div>{sticker?.title}</div>
                                        <div>${sticker?.price}</div>
                                    </div>
                                </NavLink>
                                <div className="sticker-details_bottom">
                                    <NavLink to={`/${sticker.id}/edit-sticker`} className={'navlink'}>edit</NavLink>
                                    <OpenModalMenuItem
                                    itemText='Delete'
                                    modalComponent={<DeleteSticker sticker={sticker} />}
                                    />
                                </div>
                            </div>
                            )}
                        })}
                    </div>
                )}
            </div>
        )}
        </>
    )
}