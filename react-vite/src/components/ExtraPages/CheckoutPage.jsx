import { useDispatch, useSelector } from 'react-redux'
import './ExtraPages.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { thunkLoadAllCarts, thunkAddToCart, thunkRemoveOneSticker, thunkRemoveAllSticker } from '../../redux/cardReducer'


export default function CheckoutPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fetchCartStickers = useSelector(state => state.carts);
    const user = useSelector(state => state.session.user)




    const cart_stickers = Object.values(fetchCartStickers)


    const getCheckout = async () => {
        await dispatch(thunkRemoveAllSticker())
        await dispatch(thunkLoadAllCarts())


        navigate('/thank-you-for-your-purchased')
    }


    let subTotal = 0;
    for (let sticker of cart_stickers) {
        if (sticker && sticker?.stickers && sticker?.stickers?.length > 0 && sticker?.userId === user?.id) {
            subTotal += sticker?.stickers[0]?.price * sticker.quantity
        }
    }
    
    let shippingfee = 2.99;
    let total = 0;
    if (subTotal > 3) {
        shippingfee = 'free'
        total += subTotal
    } else {
        total += subTotal + shippingfee
        shippingfee = '$2.99'
    }


    return (
        <>
            <div className='goback' onClick={() => navigate('/')}>
                <i className="fa-solid fa-arrow-left"></i>
            </div>
        
            {cart_stickers.length > 0 ? (
                <div className='checkout_container'>
                    
                    <section className='checkout_stickers'>
                        {cart_stickers.map(sticker => {


                            const addSticker = async () => {
                                await dispatch(thunkAddToCart(sticker, sticker?.stickerId))
                                await dispatch(thunkLoadAllCarts())
                            }


                            const removeSticker = async () => {
                                await dispatch(thunkRemoveOneSticker(sticker?.id))
                                await dispatch(thunkLoadAllCarts())
                            }
                            return (
                                <>
                                    {sticker && sticker?.stickers && sticker?.stickers?.length > 0 && sticker?.userId === user?.id && (
                                        <div id='checkout-stickers'>
                                            <img src={sticker?.stickers[0]?.image} alt="" style={{ width: '220px' }} />
                                            <div id='checkout-stickers-info'>


                                                <div>
                                                    <div>{sticker?.stickers[0]?.title}</div>
                                                    <div>Quanity - </div>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                    <div>${sticker?.stickers[0]?.price}</div>


                                                    <div style={{ display: 'flex' }} id="quantity-add-remove">
                                                        <button style={{ marginRight: '10px', border: 'none' }} onClick={removeSticker}>-</button>
                                                        <div>{sticker?.quantity}</div>
                                                        <button style={{ marginLeft: '10px', border: 'none' }} onClick={addSticker}>+</button>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    )}
                                </>
                            )
                        })}
                    </section>


                    <section id='checkout-price'>
                        <p>Add ${10 - subTotal < 0 ?(0) :(10 - subTotal).toFixed(2)} more for free-shipping</p>
                        <div>Subtotal <span>${subTotal.toFixed(2)}</span></div>
                        <div>Shipping <span>{shippingfee}</span></div>
                        <div>Total 
                            <span>USD <span>${total.toFixed(2)}</span></span>
                        </div>
                        <div className="checkout-cart_container" >
                            <button className="checkout">
                              <div onClick={getCheckout}>Go to Checkout</div>
                            </button>
                          
                        </div>                    
                        
                    </section>
                </div>
            ) : (
                <>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <img src="https://stickycat.s3.us-east-2.amazonaws.com/IMG_2919.PNG" alt="empty-cart" style={{ width: '25em' }} />
                        <p>Cart is Empty!!!</p>
                    </div>
                </>
            )}
        </>
    )
}


