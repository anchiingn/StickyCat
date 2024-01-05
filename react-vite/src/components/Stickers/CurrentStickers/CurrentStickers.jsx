import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkLoadCurrentStickers } from "../../../redux/stickerReducer"
import { NavLink } from "react-router-dom"
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem"
import DeleteSticker from "../DeleteSticker/DeleteSticker"


export default function CurrentStickers() {
    const dispatch = useDispatch()
    const allStickers = useSelector(state => state.stickers)
    const user = useSelector(state => state.session?.user)
    
    console.log(allStickers)

    useEffect(() => {
        dispatch(thunkLoadCurrentStickers())
    }, [dispatch])

    const stickers = Object.values(allStickers)


    return (
        <>
        {user &&
            stickers.map(sticker => {
                if (user?.id === sticker?.ownerId) {
                    return (
                        <div key={sticker?.id}>
                            <NavLink to={`/stickers/${sticker?.id}`} >
                                <img src={sticker?.image} alt={sticker?.title} />
                                <div>{sticker?.title}</div>
                                <div>{sticker?.price}</div>
                            </NavLink>
                            <div>
                                <OpenModalMenuItem
                                    itemText='Delete'
                                    modalComponent={<DeleteSticker sticker={sticker} />}
                                />
                            </div>
                        </div>
                    )
                }
            })
        }
        </>
    )
}