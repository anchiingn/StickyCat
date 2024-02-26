import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { thunkEditStickers, thunkLoadCurrentStickers, thunkLoadSingleSticker } from '../../redux/stickerReducer';

export default function EditSticker () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
                                            
    const fetchStickers = useSelector(state => state.stickers)

    useEffect(() => {
        dispatch(thunkLoadSingleSticker(id))
    },[dispatch, id])

    const sticker = fetchStickers ?Object.values(fetchStickers).pop() :[]

    const [title, setTitle] = useState(sticker?.title || '');
    const [price, setPrice] = useState(sticker?.price || '');
    const [height, setHeight] = useState(sticker?.height || '');
    const [width, setWidth] = useState(sticker?.width || '');
    const [message, setMessage] = useState(sticker?.message || '');
    const [validation, setValidation] = useState({})
    const [submit, setSubmit] = useState(false)


    useEffect(() => {
        if (sticker) {
            setTitle(title ? title : sticker.title)
            setPrice(price ? price : sticker.price)
            setHeight(height ? height : sticker.height)
            setWidth(width ? width : sticker.width)
            setMessage(message ? message : sticker.message)
        }

        const errors = {}
            if (!title) {
                errors.title = 'Title is required';
            }
            if (!price) {
                errors.price = 'Price is required';
            }
            // if (price && !/^[0-9]+$/.test(price)) {
            //     errors.price = 'Must be number'
            // }
            if (!height) {
                errors.height = 'height is required';
            }
            if (!width) {
                errors.width = 'width is required';
            }
        
    
        setValidation(errors);

    }, [sticker, title, price, height, width, message])


    const onSubmit = async (e) => {
        e.preventDefault()

        const newSticker = {
            title, 
            price,
            height,
            width,
            message
        }

        setSubmit(true)

        // const formData = new FormData()
        // formData.append("title", title)
        // formData.append("price", price)
        // formData.append("image", image)
        // formData.append("height", height)
        // formData.append("width", width)
        // formData.append("message", message)

        await dispatch(thunkEditStickers(newSticker, id))
        await dispatch(thunkLoadCurrentStickers())
        navigate('/my-stickers')
    }

    return (
        <>
        <div className="stickers-toppart_container">
            {/* <NavLink to={'/my-stickers'} className={'navlink'}>My Stickers</NavLink> 
            / */}
            <NavLink className={'navlink'} style={{cursor:'default'}}>Edit Sticker</NavLink>
            /
        </div>


        <div >
            <div className='sticker-form_container'>
                    <div>Edit Sticker</div>

                    <form onSubmit={onSubmit} encType="multipart/form-data" className='create-form' >
                    
                    <div id='image-side'>
                        <div>
                            <img src={sticker?.image} alt="" />
                        </div>
                    </div>
                    
                    <div id='form-side'>
                        <div className='error_container'>
                            {validation.title && submit && <p className="errors">{validation.title}</p>}
                            {validation.price && submit && <p className="errors">{validation.price}</p>}
                            {validation.height && submit && <p className="errors">{validation.height}</p>}
                            {validation.width && submit && <p className="errors">{validation.width}</p>}
                        </div>

                        <label>Title</label>
                        <input 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Price</label>
                        <input 
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <div className='height-width_container create_height-width'>
                            <label>Height</label>
                            <input 
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                            <label>Width</label>
                            <input 
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                            />
                        </div>
                        <label>Message</label>
                        <textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <div style={{display:'flex'}}>
                            <button >Submit</button>
                            <button className='cancel-form' onClick={() => navigate('/my-stickers')}>Cancel</button>
                        </div>
                    </div>

                    </form>
            </div>
        </div> 
        </>
    )
}