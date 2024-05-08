import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { thunkAddToCart, thunkLoadAllCarts } from "../../redux/cardReducer"

const AddToCart = ({ sticker }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    //add to cart
    const addToCart = async (e) => {
        e.preventDefault()

        await dispatch(thunkAddToCart(sticker, sticker.id))
        await dispatch(thunkLoadAllCarts())
    }
    /////////////

    return (
        <>
            {/* add to cart */}
            {user ? (
                sticker.ownerId !== user?.id && (
                    <div className="cart_hover" onClick={addToCart}>
                        Add to cart
                    </div>
                )
            ) : (
                <NavLink to="/login" className="navlink">
                    <div className="cart_hove" >
                        Add to cart
                    </div>
                </NavLink>
            )}
        </>
    )
}

export default AddToCart