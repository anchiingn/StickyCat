import { useDispatch } from "react-redux";
import { thunkDeleteFromFavorite, thunkLoadAllFavorites } from "../../redux/stickerReducer";
import { useModal } from "../../context/Modal";

export default function DeleteFavorites({ sticker }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const removeFavorite = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeleteFromFavorite(sticker.id))
        await dispatch(thunkLoadAllFavorites())
        
        closeModal()
        navigation('/my-favorite-stickers')

    }

    return (
        <>
            <div >
                <h2 >Delete Favorite Sticker?</h2>
                <div>Are you sure you want to remove this favorite sticker?</div>
                <div >
                    <button onClick={removeFavorite}>Delete</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </>
    )
}