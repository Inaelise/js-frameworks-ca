import "./App.css";
import Home from "./components/Home";
import ProductPage from "./components/ProductPage";
import ContactPage from "./components/ContactPage";
import CheckoutPage from "./components/CheckoutPage";
import CheckoutSuccessPage from "./components/CheckoutSuccessPage";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

const apiUrl = "https://v2.api.noroff.dev/online-shop";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        setItems(json.data);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home items={items} />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout-success" element={<CheckoutSuccessPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
