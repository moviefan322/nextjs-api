import React, { useEffect, useState } from "react";
import useSWR from "swr";

type Sales = {
  id: string;
  username: string;
  volume: number;
}[];

type Props = {
  sales: Sales;
};

function LastSalesPage(props: Props) {
  const [sales, setSales] = useState([]);
  //   const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://nextjs-course-5f0d7-default-rtdb.firebaseio.com/sales.json"
  );

  useEffect(() => {
    if (data) {
      const transformedSales: Sales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales: (value: React.SetStateAction<undefined>) =>
        void (transformedSales as Sales);
    }
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch("https://nextjs-course-5f0d7-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales: {
  //           id: string;
  //           username: string;
  //           volume: number;
  //         }[] = [];

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales: (value: React.SetStateAction<undefined>) =>
  //           void (transformedSales as {
  //             id: string;
  //             username: string;
  //             volume: number;
  //           }[]);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {data.map((sale: { id: string; username: string; volume: number }) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-5f0d7-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales: Sales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: transformedSales,
    },
    revalidate: 10,
  };
}

export default LastSalesPage;
