import "./App.css";
import Home from "./components/Home";
import ProductPage from "./components/ProductPage";
import ContactPage from "./components/ContactPage";
import CheckoutPage from "./components/CheckoutPage";
import CheckoutSuccessPage from "./components/CheckoutSuccessPage";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";

const apiUrl = "https://v2.api.noroff.dev/online-shop";

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        setItems(json.data);
        setFilteredItems(json.data);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) {
      setFilteredItems(items);
      return;
    }

    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} items={items} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home items={filteredItems} />} />
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
