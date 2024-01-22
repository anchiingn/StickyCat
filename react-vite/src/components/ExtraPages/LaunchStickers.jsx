import { NavLink } from 'react-router-dom'
import './ExtraPages.css'
import { useSelector } from 'react-redux'

export default function LaunchStickers () {
    const user = useSelector(state => state.session.user)
    
    return (
        <>
        <div className='image-backgrround'>
            <img src="https://stickycat.s3.us-east-2.amazonaws.com/IMG_2901.JPG" alt=""/>
        </div>
        

        <div className='blank-background_container'>
            <div className='small_container'>Innovation <span>-</span> Imaginative <span>-</span> Originality <span>-</span> Inventive <span>-</span> Visionary</div>
            

            <div className='about-infos_container'>

                <h1>TURN YOUR CREATIVITY INTO STICKER</h1>
                <p>Let&apos;s embark on a creative journey together! With StickyCat, we&apos;ll join forces to bring your dream sticker collection to life. Collaborating, conceptualizing, presenting, marketing, and manufacturing all tailored by you for your fans. The best part? It&apos;s a seamless, worry free adventure with no upfront expenses!</p>
                <div className="line-in-between"></div>

                <button className='user-button'>
                    {user ?(
                        <NavLink to="/new-sticker" className={'navlink'} style={{padding:'20px 40px', borderRadius:'50px'}}> Let Create Sticker</NavLink>
                    ): (<NavLink to="/login" className={'navlink'} style={{padding:'20px 40px', borderRadius:'50px'}}> Let Create Sticker</NavLink>                    )
                    }
                </button>
            </div>
        </div>
        </>
    )
}