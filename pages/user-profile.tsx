import React from "react";

type Props = {
  username: string;
};

function UserProfile(props: Props) {
  return <h1>Max</h1>;
}

export default UserProfile;

export async function getServerSideProps(context: any) {
  const { params, req, res } = context;
  console.log("Server side code");
  console.log(req);
  console.log(res);

  return {
    props: {
      username: "Max",
    },
  };
}
