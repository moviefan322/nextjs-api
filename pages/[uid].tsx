import React from "react";

function UserIdPage(props: any) {
  return <h1>{props.id}</h1>;
}

export default UserIdPage;

export async function getServerSideProps(context: any) {
  const { params, req, res } = context;
  console.log(req);
  console.log(res);
  return {
    props: {
      id: "userid-" + params.uid,
    },
  };
}
