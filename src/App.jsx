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
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        setItems(json.data);
        setFilteredItems(json.data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
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
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              isLoading ? (
                <div className="spinner-container">
                  <div className="spinner"></div>
                </div>
              ) : isError ? (
                <div>
                  <p>Something went wrong. Could not load data.</p>
                </div>
              ) : (
                <Home items={filteredItems} onSearch={handleSearch} />
              )
            }
          />
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
