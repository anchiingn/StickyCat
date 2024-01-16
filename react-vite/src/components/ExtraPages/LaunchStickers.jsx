import { NavLink } from 'react-router-dom'
import NewSticker from '../Stickers/NewSticker'
import './ExtraPages.css'

export default function LaunchStickers () {
    return (
        <>
        <div className='image-backgrround'>
            <img src="https://stickycat.s3.us-east-2.amazonaws.com/IMG_2901.JPG" alt=""/>
        </div>
        

        <div className='blank-background_container'>
            <div className='small_container'>Innovation <span>-</span> Imaginative <span>-</span> Originality <span>-</span> Inventive <span>-</span> Visionary</div>
            

            <div className='about-infos_container'>

                <h1>TURN YOUR CREATIVITY INTO STICKER</h1>
                <p>Let's embark on a creative journey together! With StickyCat, we'll join forces to bring your dream sticker collection to life. Collaborating, conceptualizing, presenting, marketing, and manufacturing – all tailored by you for your fans. The best part? It's a seamless, worry-free adventure with no upfront expenses!</p>
                <div className="line-in-between"></div>

                <button className='user-button'>
                    <NavLink to="/new-sticker" className={'navlink'} style={{padding:'20px 40px', borderRadius:'50px'}}> Let Create Sticker</NavLink>
                </button>
            </div>
        </div>
        <div>hello</div>
        </>
    )
}