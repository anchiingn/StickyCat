import { NavLink, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { thunkAddToFavorite, thunkDeleteFromFavorite, thunkLoadAllStickers, thunkLoadCurrentStickers, thunkLoadAllFavorites } from "../../redux/stickerReducer"
import { thunkSearchStickers } from "../../redux/stickerReducer"
import './AddToFavorite.css'

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
                    <div className="add_to_favorite">
                        {sticker?.favorited?.length === 0 ? (
                            <i className="fa-regular fa-heart favorite-button" onClick={addToFavorite}></i>
                        ) : (
                            <i className="fa-solid fa-heart favorite-button" onClick={removeFromFavorite}></i>
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