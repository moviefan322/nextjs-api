type Props = {
  products: {
    id: string;
    title: string;
  }[];
};

function Home(props: Props): JSX.Element {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  return {
    props: {
      products: [{ id: "1", title: "Product 1" }],
    },
  };
}

export default Home;
