import { NavLink, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { thunkAddToFavorite, thunkDeleteFromFavorite, thunkLoadAllStickers, thunkLoadCurrentStickers, thunkLoadAllFavorites } from "../../redux/stickerReducer"
import { thunkSearchStickers } from "../../redux/stickerReducer"


const AddToFavorite = ({ sticker }) => {
    const { searchStickers } = useParams();
    const decodedString = decodeURIComponent(searchStickers);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    //add and remove from favorite
    const addToFavorite = async (e) => {
        e.preventDefault()
        await dispatch(thunkAddToFavorite(sticker, sticker.id))

        if (window.location.pathname === '/explored-stickers') {
            await dispatch(thunkLoadAllStickers())
        }
        else {
            await dispatch(thunkSearchStickers(decodedString))
        }
    }
    ///////////////////////////////
    const removeFromFavorite = async (e) => {
        e.preventDefault()
        if (sticker && sticker?.favorited.length > 0) {
            await dispatch(thunkDeleteFromFavorite(sticker?.favorited[0]?.id))

            if (window.location.pathname === '/explored-stickers') {
                await dispatch(thunkLoadAllStickers())
            } 
            else {
                await dispatch(thunkSearchStickers(decodedString))
            }
        }
    }

    return (
        <>
            {/* add and remove from favorite */}
            {user ? (
                sticker?.ownerId !== user.id && (
                    <div>
                        {sticker?.favorited?.length === 0 ? (
                            <i className="fa-regular fa-heart favorite-button" style={{ fontSize: '16px' }} onClick={addToFavorite}></i>
                        ) : (
                            <i className="fa-solid fa-heart favorite-button" style={{ fontSize: '16px' }} onClick={removeFromFavorite}></i>
                        )}
                    </div>
                )
            ) : (
                <div>
                    <NavLink to="/login" className="navlink">
                        <i className="fa-regular fa-heart favorite-button" style={{ fontSize: '16px' }}></i>
                    </NavLink>
                </div>
            )}
        </>
    )
}

export default AddToFavorite