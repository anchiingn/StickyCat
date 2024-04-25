import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginSignupPage/LoginFormPage';
import SignupFormPage from '../components/LoginSignupPage/SignupFormPage';
import AllStickers from '../components/Stickers/AllStickers';
import StickerDetail from '../components/Stickers/StickerDetail';
import CurrentStickers from '../components/Stickers/CurrentStickers';
import NewSticker from '../components/Stickers/NewSticker';
import EditSticker from '../components/Stickers/EditSticker';
import AllFavoriteStickers from '../components/Favorites/AllFavoriteStickers';
import MainPage from '../components/ExtraPages/MainPage'
import CheckoutPage from '../components/ExtraPages/CheckoutPage';
import LaunchStickers from '../components/ExtraPages/LaunchStickers';
import HowItWork from '../components/ExtraPages/HowItWork';
import Thankyou from '../components/ExtraPages/ThankYou';
import TagFilter from '../components/Filter/TagFilter';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />
      },
      {
        path: "/explored-stickers",
        element: <AllStickers />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "stickers/:id",
        element: <StickerDetail />
      },
      {
        path: "my-stickers",
        element: <CurrentStickers />
      },
      {
        path: "new-sticker",
        element: <NewSticker />
      },
      {
        path: ":id/edit-sticker",
        element: <EditSticker />
      },
      {
        path: "my-favorite-stickers",
        element: <AllFavoriteStickers />
      },
      {
        path: "how-it-work",
        element: <HowItWork />
      },
      {
        path:"launch-sticker",
        element: <LaunchStickers /> 
      },
      {
        path:"checkout",
        element: <CheckoutPage /> 
      },
      {
        path:"thank-you-for-your-purchased",
        element: <Thankyou />
      },
      {
        path:"stickers/tags/:tag",
        element: <TagFilter/>
      },
      {
        path: "*",
        element: <h1>Page Not Found</h1>
      }
    ],
  },
]);