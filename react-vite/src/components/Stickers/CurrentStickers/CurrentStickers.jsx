import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkLoadCurrentStickers } from "../../../redux/stickerReducer"
import { NavLink } from "react-router-dom"


export default function CurrentStickers () {
    const dispatch = useDispatch()
    const allStickers = useSelector(state => state.stickers)
    const user = useSelector(state => state.session?.user)
    console.log(user)
    useEffect(() => {
        dispatch(thunkLoadCurrentStickers())
    }, [dispatch])

    const stickers = Object.values(allStickers)

    let isUser = false
    for (let sticker of stickers) {
        if (user.id === sticker.ownerId) {
            isUser = true
        }
    }
    
    return (
        <>
            {user && isUser && 
            stickers.map(sticker => {
                return (
                    <NavLink to={`/stickers/${sticker?.id}`} key={sticker.id}>
                        <img src={sticker?.image} alt={sticker?.title} />
                        <div>{sticker?.title}</div>
                    </NavLink>
                )
            })
            }
        </>
    )
}