import Product from "./Product";
import SearchBar from "./SearchBar";

export default function Home({ items, onSearch }) {
  return (
    <main>
      <section>
        <div>
          <SearchBar onSearch={onSearch} items={items} />
        </div>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id}>
              <Product
                id={item.id}
                img={item.image}
                title={item.title}
                body={item.description}
                price={item.price}
                discountedPrice={item.discountedPrice}
              />
            </li>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </section>
    </main>
  );
}
