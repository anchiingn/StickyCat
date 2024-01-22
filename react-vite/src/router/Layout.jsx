import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer/Footer";
import './Layout.css'

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <div id="page_container">
      <div id="content_warp">
        <ModalProvider>
          <ScrollToTop />
          <Navigation />
          {isLoaded && <Outlet />}
          <Modal />
          <Footer />
        </ModalProvider>
      </div>
    </div>
    </>
  );
}
