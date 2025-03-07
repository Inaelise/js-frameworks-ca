import Product from "./Product";
import SearchBar from "./SearchBar";
import styles from "../css/Home.module.css";
import { useEffect, useState } from "react";

export default function Home({ items, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery("");
  }, []);
  return (
    <main>
      <section className={styles.listContainer}>
        <h1 className={styles.homeTitle}>
          A variety of products - endless choices
        </h1>
        <div>
          <SearchBar
            onSearch={(query) => {
              setSearchQuery(query);
              onSearch(query);
            }}
            items={items}
            query={searchQuery}
          />
        </div>
        <div className={styles.productList}>
          {items.length > 0 ? (
            items.map((item) => (
              <li key={item.id} className={styles.productItem}>
                <Product
                  id={item.id}
                  img={item.image}
                  title={item.title}
                  body={item.description}
                  price={item.price}
                  discountedPrice={item.discountedPrice}
                  rating={item.rating}
                />
              </li>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </section>
    </main>
  );
}
