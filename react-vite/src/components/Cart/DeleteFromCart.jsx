import { useDispatch } from "react-redux";
import { thunkDeleteFromCart, thunkLoadAllCarts } from "../../redux/cardReducer";
import { useModal } from "../../context/Modal";

export default function DeleteFromCart({ sticker }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const removeCart = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeleteFromCart(sticker?.id))
        await dispatch(thunkLoadAllCarts())
        closeModal()
    }

    return (
        <>
            <div className="delete_container">
                <img src={sticker?.stickers[0]?.image} alt=""/>
                <div className="delete-texts">
                    <h2 >Delete Sticker From Cart?</h2>
                    <div>Do you want to remove this sticker?</div>
                    <div className="delete-buttons">
                        <button onClick={removeCart}>Bye Bye</button>
                        <button onClick={closeModal}>Nooooo!</button>
                    </div>
                </div>
            </div>
        </>
    )
}