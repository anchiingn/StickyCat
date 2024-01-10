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
        dispatch(thunkLoadAllReviews())
    }, [dispatch])

    const stickers = Object.values(allStickers)

console.log(stickers)
    return (
        <>
        {user && (
            <div className="container">
                <div className="sticker-cards_container"> 
                    {stickers.map(sticker => {
                        if (user?.id === sticker?.ownerId) {
                            return (
                                <div key={sticker?.id} className="stickers_container">
                                <NavLink to={`/stickers/${sticker?.id}`} >
                                <div id="sticker-images_container">
                                    <img src={sticker?.image} alt={sticker?.title} />
                                </div>
                                <div>{sticker?.title}</div>
                                <div>{sticker?.price}</div>
                                </NavLink>
                                <div>
                                <NavLink to={`/${sticker.id}/edit-sticker`}>edit</NavLink>
                                <OpenModalMenuItem
                                itemText='Delete'
                                modalComponent={<DeleteSticker sticker={sticker} />}
                                />
                                </div>
                                </div>
                                )
                            }
                        })}
                </div>

            </div>
        )}
        </>
    )
}