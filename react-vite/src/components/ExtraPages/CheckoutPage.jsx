import { useDispatch, useSelector } from 'react-redux'
import './ExtraPages.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { thunkLoadAllCarts, thunkRemoveAllSticker } from '../../redux/cardReducer'

export default function CheckoutPage () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fetchCartStickers = useSelector(state => state.carts)
    
    const cart_stickers = Object.values(fetchCartStickers)

    const getCheckout = async () => {
        await dispatch(thunkRemoveAllSticker())
        await dispatch(thunkLoadAllCarts())

        navigate('/thank-you-for-your-purchased')
    }

    return (
        <>
            <div id='checkout_container'>
                {cart_stickers.map(sticker => {
                    return (
                        <>
                            <div>
                                <img src={sticker?.stickers[0]?.image} alt="" style={{width:'200px'}}/>
                                <div>{sticker?.stickers[0]?.title}</div>
                                <div>{sticker?.stickers[0]?.price}</div>
                                <div>Quanity - {sticker?.quantity}</div>
                            </div>
                        </>
                    )
                })}

                <div>
                    <div>Subtotal - $$$</div>
                    <div>Shipping - Free</div>
                    <div>Total - $$$</div>
                    <button onClick={getCheckout}>Checkout</button>
                </div>
                <NavLink to={'/explored-stickers'} className={'navlink'}> <i className="fa-solid fa-hand-point-left"></i> Countinue Explored Stickers</NavLink>
            </div>
        </>
    )
}