import "./App.css";
import Home from "./components/Home";
import ProductPage from "./components/ProductPage";
import ContactPage from "./components/ContactPage";
import CheckoutPage from "./components/CheckoutPage";
import CheckoutSuccessPage from "./components/CheckoutSuccessPage";
import PageNotFound from "./components/PageNotFound";
import Layout from "./components/Layout";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import style from "./css/Spinner.module.css";
import styles from "./css/Home.module.css";

const apiUrl = "https://v2.api.noroff.dev/online-shop";

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    if (location.pathname === "/") {
      setFilteredItems(items);
    }
  }, [location.pathname, items]);

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
                <div className={style.spinnerContainer}>
                  <div className={style.spinner}></div>
                </div>
              ) : isError ? (
                <div className={styles.errorContainer}>
                  <CircleAlert size={38} />
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
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
