
import { Button, FormControl, Input, Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";

import { AuthProvider } from "../lib/AuthProvider";
import { AuthContext } from "../lib/AuthProvider";

import { useQuery } from "react-query";

import {signinWithHiveKeychain} from '../lib/AuthProvider';
import { findComments } from "../lib/dhive";

export default function SandBox() {
  return (
    <AuthProvider>
      <UserDetails />
    </AuthProvider>
  );
}

const UserDetails = () => {
  const {user, setUser} = React.useContext(AuthContext);
  const [input, setInput] = React.useState('')

  const { data } = useQuery(
    "question",
    () =>
      findComments(
        "peping",
        "student-trying-to-live-in-a-crypto-world-my-introduction-to-the-hive"
      ),
    // { initialData: post }
  );

  return (
    <Box
    height="100vh"
    w="100%"
      d="flex"
      justifyContent="center"
      alignItems="center"
      bg={"gray.800"}
      color="white"
      textAlign="center"
      flexDir="column"
      flexWrap="wrap"
    >
      {/* <Box d="flex" flexWrap="wrap" margin="auto" textAlign="center" w="100%" maxW="400px">{JSON.stringify(user)}</Box>

      <Box w="400px" d="flex" bg="gray.200" p={4} pr={0}>
        <FormControl>
          <Input
          color="gray.800"
            placeholder="username"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Button
            bgColor="gray.800"
            onClick={() => signinWithHiveKeychain(input, null)}
          >
            Sign In
          </Button>
        </FormControl>
      </Box> */}

      {JSON.stringify(data)}

    </Box>
  );
};
