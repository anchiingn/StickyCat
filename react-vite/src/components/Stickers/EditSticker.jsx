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

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [message, setMessage] = useState('');


    // useEffect(() => {
    //     if (sticker) {
    //         setTitle(title ? title : sticker.title)
    //         setPrice(price ? price : sticker.price)
    //         setImage(image ? image : sticker.image)
    //         setHeight(height ? height : sticker.height)
    //         setWidth(width ? width : sticker.width)
    //         setMessage(message ? message : sticker.message)
    //     }
    // }, [sticker, title, price, title, price, image, height, width, message])


    const onSubmit = async (e) => {
        e.preventDefault()

        // const newSticker = {
        //     title, 
        //     price,
        //     image,
        //     height,
        //     width,
        //     message
        // }
        // console.log(newSticker)

        const formData = new FormData()
        formData.append("title", title)
        formData.append("price", price)
        formData.append("image", image)
        formData.append("height", height)
        formData.append("width", width)
        formData.append("message", message)

        
        await dispatch(thunkEditStickers(formData, id))
        // await dispatch(thunkLoadCurrentStickers())
        navigate('/my-stickers')
    }


    return (
        <>
            {/* <div className="container">
            <div className="login_container"> */}
                <form onSubmit={onSubmit} encType="multipart/form-data" >
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
                    <label>image</label>
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
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
                    <label>message</label>
                    <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button>Submit</button>
                </form>
            {/* </div>
        </div> */}
        </>
    )
}