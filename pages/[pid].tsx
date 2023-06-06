import React from "react";
import fs from "fs";
import path from "path";

type Props = {
  loadedProduct: {
    id: string;
    title: string;
    description: string;
  };
};

function SingleProduct(props: Props) {
  const { loadedProduct } = props;

  return (
    <div>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </div>
  );
}

export async function getStaticProps(context: any) {
  // fetch data for a single product
  const { params } = context;
  const productId = params.pid;

  console.log("Generating...", productId);

  const filePath: string = path.join(
    process.cwd(),
    "data",
    "dummy-backend.json"
  );
  const jsonData: string = await fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  const product = data.products.find(
    (product: any) => product.id === productId
  );

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  // fallback: false means that "not found" pages will be resolved into 404 pages
  // fallback: true means that "not found" pages will be resolved into a fallback page
  // fallback: "blocking" means that "not found" pages will be resolved into a fallback page, but only after the data is loaded
  return {
    paths: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ],
    fallback: false,
  };
}

export default SingleProduct;
