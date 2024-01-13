import { useDispatch } from "react-redux";
import { thunkDeleteFromFavorite, thunkLoadAllFavorites } from "../../redux/stickerReducer";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";

export default function DeleteFavorites({ sticker }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const removeFavorite = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeleteFromFavorite(sticker.id))
        await dispatch(thunkLoadAllFavorites())
        
        closeModal()
        navigate('/my-favorite-stickers')
    }

    return (
        <>
            <div className="delete_container">
                <img src={sticker?.stickers[0]?.image} alt=""/>
                <div className="delete-texts">
                    <h2 >Delete Favorite Sticker?</h2>
                    <div>Do you want to remove this sticker?</div>
                    <div className="delete-buttons">
                        <button onClick={removeFavorite}>Bye Bye</button>
                        <button onClick={closeModal}>Nooooo!</button>
                    </div>
                </div>
            </div>
        </>
    )
}