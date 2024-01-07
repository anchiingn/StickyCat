import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkLoadSingleSticker } from "../../../redux/stickerReducer"
import { useParams } from "react-router-dom"
import ALlReviews from "../../Reviews/AllReviews/AllReviews"
import { thunkLoadAllReviews } from "../../../redux/reviewReducer"

export default function StickerDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const sticker = useSelector(state => state?.stickers)

    useEffect(() => {
        dispatch(thunkLoadSingleSticker(id))
        dispatch(thunkLoadAllReviews(id))
    }, [dispatch, id])

    const single_sticker = Object.values(sticker)

    return (
        <>
            <img src={single_sticker[0]?.image} alt={single_sticker[0]?.title} />
            <div>{single_sticker[0]?.title}</div>
            <div>{single_sticker[0]?.price}</div>
            <div>Message from creator: {single_sticker[0]?.message}</div>
            <div>Height: {single_sticker[0]?.height}</div>
            <div>Width: {single_sticker[0]?.width}</div>
            <div>
                <ALlReviews sticker={single_sticker} id={id}/>
            </div>
        </>
    )
}