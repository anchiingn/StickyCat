import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AllStickers from '../components/Stickers/AllStickers';
import StickerDetail from '../components/Stickers/StickerDetail';
import CurrentStickers from '../components/Stickers/CurrentStickers';
import NewSticker from '../components/Stickers/NewSticker';
import EditSticker from '../components/Stickers/EditSticker';
import AllFavoriteStickers from '../components/Favorites/AllFavoriteStickers';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
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
        path: "*",
        element: <h1>Page Not Found</h1>
      }
    ],
  },
]);