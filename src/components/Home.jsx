import Product from "./Product";

export default function Home(props) {
  return (
    <main>
      <section>
        {props.items.map((item) => (
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
        ))}
      </section>
    </main>
  );
}
