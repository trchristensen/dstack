import { Button, FormControl, Input, Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import { AuthProvider } from "../lib/AuthProvider";
import { AuthContext } from "../lib/AuthProvider";
import { useQuery } from "react-query";

import { findAccounts, getContent } from "../lib/hive-js";
import hive from "@hiveio/hive-js";

export default function SandBox() {
  return (
    <AuthProvider>
      <UserDetails />
    </AuthProvider>
  );
}

const UserDetails = () => {

const getData = async () => {
    const data = await hive.api.getStateWith({ path : "/@ipeeyay/" },
    (err, data) => {
        console.log(data)
    }
    )
}

  const { user, setUser } = React.useContext(AuthContext);
  const [input, setInput] = React.useState("");

//   const [accounts, setAccounts] = React.useState(null)
  const { isLoading, error, data, isFetching } = useQuery("question", () => getData())
    

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error;

  return <Box>Results: {JSON.stringify(data)}</Box>;
};