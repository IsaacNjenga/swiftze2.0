import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Cart from "./pages/cart";
import Profile from "./pages/profile";
import Signout from "./pages/signout";

export const UserContext = createContext();

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [cartItems, setCartItems] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const showDrawer = () => setOpenDrawer(true);
  const closeDrawer = () => setOpenDrawer(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <UserContext.Provider
        value={{
          isMobile,
          setIsMobile,
          cartItems,
          setCartItems,
          openDrawer,
          showDrawer,
          closeDrawer,
          cartItem,
          setCartItem,
          collapsed,
          setCollapsed,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sign-out" element={<Signout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
