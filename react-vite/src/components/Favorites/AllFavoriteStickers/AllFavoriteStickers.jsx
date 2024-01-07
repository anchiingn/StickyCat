import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkLoadAllFavorites } from "../../../redux/stickerReducer"
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem"
import { NavLink } from "react-router-dom"
import DeleteFavorites from "../DeleteFavorites/DeleteFavorites"


export default function AllFavoriteStickers() {
    const dispatch = useDispatch()
    const fetchAllFavorites = useSelector(state => state?.stickers)
    // const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkLoadAllFavorites())
    }, [dispatch])

    const favorite_stickers = fetchAllFavorites ? Object.values(fetchAllFavorites) : []
    return (
        <>
            {favorite_stickers.map(sticker => {
                // Check if sticker and sticker.stickers exist and have at least one element
                if (sticker && sticker.stickers && sticker.stickers.length > 0) {
                    return (
                        <div key={sticker?.id}>
                            <NavLink to={`/stickers/${sticker?.stickerId}`}>
                                <img src={sticker?.stickers[0]?.image} alt={sticker?.stickers[0]?.title} />
                                <div>{sticker?.stickers[0]?.title}</div>
                                <div>{sticker?.stickers[0]?.price}</div>
                            </NavLink>
                            <div>
                                <OpenModalMenuItem
                                    itemText='Delete'
                                    modalComponent={<DeleteFavorites sticker={sticker} />}
                                />
                            </div>
                        </div>
                    )
                } 
            })}
        </>
    )
}