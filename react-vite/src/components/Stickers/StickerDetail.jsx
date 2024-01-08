import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkLoadSingleSticker, thunkAddToFavorite } from "../../redux/stickerReducer"
import { useParams } from "react-router-dom"
import ALlReviews from "../Reviews/AllReviews"
import { thunkLoadAllReviews } from "../../redux/reviewReducer"
import { thunkAddToCart } from "../../redux/cardReducer"

export default function StickerDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const sticker = useSelector(state => state?.stickers)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkLoadSingleSticker(id))
        dispatch(thunkLoadAllReviews(id))
    }, [dispatch, id])
    
    const single_sticker = sticker ? Object.values(sticker) : []

    const addToFavorite = async(e) => {
        e.preventDefault()

        await dispatch(thunkAddToFavorite(single_sticker, id))
    }

    const addToCart = async(e) => {
        e.preventDefault()

        await dispatch(thunkAddToCart(single_sticker, id))
    }


    return (
        <>
            <img src={single_sticker[0]?.image} alt={single_sticker[0]?.title} />
            <div>{single_sticker[0]?.title}</div>
            <div>{single_sticker[0]?.price}</div>
            <div>Message from creator: {single_sticker[0]?.message}</div>
            <div>Height: {single_sticker[0]?.height}</div>
            <div>Width: {single_sticker[0]?.width}</div>
            {user && single_sticker[0]?.ownerId !== user.id && (
                <div>
                    <button onClick={addToFavorite}>Favorite</button>
                    <button onClick={addToCart}>Add to Cart</button>
                </div>
            )}
            <div>
                <ALlReviews sticker={single_sticker} id={id}/>
            </div>
        </>
    )
}