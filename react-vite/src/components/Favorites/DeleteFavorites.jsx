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
            <div >
                <img src={sticker?.stickers[0]?.image} alt="" style={{height:'100px'}}/>
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