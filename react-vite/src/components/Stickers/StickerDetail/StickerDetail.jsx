import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkLoadSingleSticker } from "../../../redux/stickerReducer"
import { useParams } from "react-router-dom"

export default function StickerDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const sticker = useSelector(state => state?.stickers)

    useEffect(() => {
        dispatch(thunkLoadSingleSticker(id))
    }, [dispatch, id])

    return (
        <>
            <img src={sticker.image} alt={sticker.title} />
            <div>{sticker?.title}</div>
        </>
    )
}