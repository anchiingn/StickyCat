import { useDispatch } from "react-redux"
import { thunkDeleteStickers, thunkLoadCurrentStickers } from "../../redux/stickerReducer"
import { useModal } from "../../context/Modal"
import { useNavigate } from "react-router-dom"

export default function DeleteSticker({sticker}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const navigation = useNavigate()
   
    const delete_sticker = async (e) => {
        e.preventDefault()
        
        await dispatch(thunkDeleteStickers(sticker.id))
        await dispatch(thunkLoadCurrentStickers())
        
        closeModal()
        navigation('/my-stickers')
    }

    return (
        <>
            <div className="delete_container">
                <img src={sticker?.image} alt="" />
                <div className="delete-texts">
                    <h2 >Delete Sticker</h2>
                    <div>Do you want to remove this sticker?</div>
                    <div className="delete-buttons">
                        <button onClick={delete_sticker}>Bye Bye</button>
                        <button onClick={closeModal}>Nooooo!</button>
                    </div>
                </div>
            </div>
        </>
    )
}