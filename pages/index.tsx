import path from "path";
import fs from "fs";

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
  console.log("(Re-)Generating...")
  // Call an external API endpoint to get posts
  const filePath: string = path.join(
    process.cwd(),
    "data",
    "dummy-backend.json"
  );
  const jsonData: string = await fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default Home;
