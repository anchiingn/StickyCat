import { useDispatch } from "react-redux"
import { thunkDeleteStickers, thunkLoadCurrentStickers } from "../../../redux/stickerReducer"
import { useModal } from "../../../context/Modal"

export default function DeleteSticker({sticker}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
   
    const delete_sticker = async (e) => {

        await dispatch(thunkDeleteStickers(sticker.id))
        await dispatch(thunkLoadCurrentStickers())
        closeModal()
    }

    return (
        <>
            <div>
            <div>Confirm Delete</div>
            <div>Are you sure you want to remove this sticker?</div>
            <div>
                <button onClick={delete_sticker}>Yes </button>
                <button onClick={closeModal}>No </button>
            </div>
        </div>
        </>
    )
}