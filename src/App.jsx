import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Mainpage from "./pages/Mainpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";

function App() {
  const [data, setData] = useState([]);
  const [searchterm, setSearchterm] = useState("");
  const [cart,setcart]=useState([]);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        console.log(response.data.products);
        setData(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
      <Navbar searchterm={searchterm} setSearchterm={setSearchterm} count={cart.length} />
        <Routes>
          <Route
            path="/"
            element={<Mainpage data={data} searchterm={searchterm} cart={cart} setcart={setcart} />}
          />
          <Route path="/cart" element={<Cart cart={cart} setcart={setcart} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
