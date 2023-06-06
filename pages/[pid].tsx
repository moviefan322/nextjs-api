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

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </div>
  );
}

async function getData() {
  const filePath: string = path.join(
    process.cwd(),
    "data",
    "dummy-backend.json"
  );
  const jsonData: string = await fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);
  return data;
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
  const data = await getData();

  const product = data.products.find(
    (product: any) => product.id === productId
  );

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product: any) => product.id);

  const params = ids.map((id: any) => ({ params: { pid: id } }));
  // fallback: false means that "not found" pages will be resolved into 404 pages
  // fallback: true means that "not found" pages will be resolved into a fallback page
  // fallback: "blocking" means that "not found" pages will be resolved into a fallback page, but only after the data is loaded
  return {
    paths: params,
    fallback: true,
  };
}

export default SingleProduct;
