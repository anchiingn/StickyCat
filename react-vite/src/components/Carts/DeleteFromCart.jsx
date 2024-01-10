import { useDispatch } from "react-redux";
import { thunkDeleteFromCart, thunkLoadAllCarts } from "../../redux/cardReducer";
import { useModal } from "../../context/Modal";

export default function DeleteFromCart({ sticker }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    console.log(sticker.id)

    const removeCart = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeleteFromCart(sticker?.id))
        await dispatch(thunkLoadAllCarts())
        closeModal()

    }

    return (
        <>
            <div >
                <h2 >Delete Sticker From Cart?</h2>
                <div>Are you sure you want to remove this sticker from cart?</div>
                <div >
                    <button onClick={removeCart}>Delete</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </>
    )
}