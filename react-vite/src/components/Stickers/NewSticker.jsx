import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { thunkCreateNewStickers } from '../../redux/stickerReducer';

export default function NewSticker () {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [message, setMessage] = useState('');
    const [submit, setSubmit] = useState(false)
    const [validation, setValidation] = useState({})

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imgRef = useRef();

    useEffect(() => {
        const errors = {}
            if (!title) {
                errors.title = 'Title is required';
            }
            if (!price) {
                errors.price = 'Price is required';
            }
            if (price && /[a-z]/.test(price)) {
                errors.price = 'Must be number'
            }
            if (!image) {
                errors.image = 'Image is required';
            }
            if (!height) {
                errors.height = 'Height is required';
            }
            if (!width) {
                errors.width = 'Width is required';
            }
            if (message && message.length > 500) {
                errors.message = 'Must contain 500 characters long'
            }
        
    
        setValidation(errors);
    
    }, [title, image, price, height, width, message]);

    const onSubmit = async (e) => {
        e.preventDefault()
        
       setSubmit(true)

        const formData = new FormData()
        formData.append("title", title)
        formData.append("price", price)
        formData.append("image", image)
        formData.append("height", height)
        formData.append("width", width)
        formData.append("message", message)

        await dispatch(thunkCreateNewStickers(formData))
        // await dispatch(thunkLoadAllStickers())
        navigate('/my-stickers')
    }

    const handleImg = () => {
        imgRef.current.click()
    }
    
    return (
        <>
        <div className="stickers-toppart_container">
            <span>Create Sticker</span> <span>/</span>
        </div>

        <div >
            <div className='sticker-form_container'>
                    <div>New Sticker</div>



                    <form onSubmit={onSubmit} encType="multipart/form-data" className='create-form'>
                    
                    <div id='image-side'> 
                        <label>Image <span style={{color:'var(--color-red)'}}>*</span> </label>
                        <div onClick={handleImg}>
                            {image ?<img src={URL.createObjectURL(image)} alt="" style={{width:'100%', cursor:'pointer'}}/>  :<img src='https://stickycat.s3.us-east-2.amazonaws.com/upload.png' alt="" style={{width:'100%'}}/>}
                            <input 
                                type="file"
                                accept="image/*"
                                onChange={(e) => {setImage(e.target.files[0])}}
                                // ref={imgRef}
                                // style={{display:'none'}}
                            />
                        </div>
                    </div>
                    <div id='form-side'>
                        <div className='error_container'>
                            {validation.title && submit && <p className="errors">{validation.title}</p>}
                            {validation.price && submit && <p className="errors">{validation.price}</p>}
                            {validation.image && submit && <p className="errors">{validation.image}</p>}
                            {validation.height && submit && <p className="errors">{validation.height}</p>}
                            {validation.width && submit && <p className="errors">{validation.width}</p>}
                            {validation.message && submit && <p className="errors">{validation.message}</p>}
                        </div>

                        <label>Title <span style={{color:'var(--color-red)'}}>*</span> </label>
                        <input 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Price <span style={{color:'var(--color-red)'}}>*</span> </label>
                        <input 
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <div className='height-width_container'>
                            <label>Height <span style={{color:'var(--color-red)'}}>*</span> </label>
                            <input 
                                type="number"
                                min={0}
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                            <label>Width <span style={{color:'var(--color-red)'}}>*</span> </label>
                            <input 
                                type="number"
                                min={0}
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
                            <button className='cancel-form' onClick={() => navigate('/launch-sticker')}>Cancel</button>
                        </div>
                    </div>
                    </form>
            </div>
        </div> 
        </>
    )
}