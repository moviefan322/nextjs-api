import exp from "constants";
import React from "react";

type Props = {
  username: string;
};

function UserProfile(props: Props) {
  return <h1>Max</h1>;
}

export default UserProfile;

export async function getServerSideProps(context: any) {
  return {
    props: {
      username: "Max",
    },
  };
}
