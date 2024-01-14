import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { thunkEditStickers, thunkLoadCurrentStickers, thunkLoadSingleSticker } from '../../redux/stickerReducer';

export default function EditSticker () {
    const { id } = useParams();
    const navigation = useNavigate()
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
            if (price && !/^[0-9]+$/.test(price)) {
                errors.price = 'Must be number'
            }
            if (!height) {
                errors.height = 'height is required';
            }
            if (!width) {
                errors.width = 'width is required';
            }
        
    
        setValidation(errors);

    }, [sticker, title, price, title, price, height, width, message])


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

        // console.log('formdata', formData)
        await dispatch(thunkEditStickers(newSticker, id))
        await dispatch(thunkLoadCurrentStickers())
        navigate('/my-stickers')
    }


    return (
        <>
        <div className='container'>
            <div className='sticker-form_container'>
                    <div>Edit Sticker</div>
                    <img src={sticker?.image} alt="" style={{width:"500px"}}/>
                    <form onSubmit={onSubmit} encType="multipart/form-data" className='create-form'>
                    {validation.title && submit && <p className="errors">{validation.title}</p>}
                    {validation.price && submit && <p className="errors">{validation.price}</p>}
                    {validation.height && submit && <p className="errors">{validation.height}</p>}
                    {validation.width && submit && <p className="errors">{validation.width}</p>}

                        <label>title</label>
                        <input 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>price</label>
                        <input 
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <div>
                            <label>height</label>
                            <input 
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                            <label>width</label>
                            <input 
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                            />
                        </div>
                        <label>message</label>
                        <textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button >Submit</button>
                    </form>
            </div>
        </div> 
        </>
    )
}