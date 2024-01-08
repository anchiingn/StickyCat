import { useDispatch } from "react-redux";
import { thunkDeleteFromCart, thunkLoadAllCarts } from "../../redux/cardReducer";
import { useModal } from "../../context/Modal";

export default function DeleteFromCart({ sticker }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const removeCart = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeleteFromCart(sticker.id))
        await dispatch(thunkLoadAllCarts())
            .then(closeModal)

    }

    return (
        <>
            <div >
                <h2 >Delete Favorite Sticker?</h2>
                <div>Are you sure you want to remove this favorite sticker?</div>
                <div >
                    <button onClick={removeCart}>Delete</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </>
    )
}