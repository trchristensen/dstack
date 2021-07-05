import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Container } from "../Container";
import {
  useColorMode,
  useColorModeValue,
  Flex,
  Box,
  Stack,
  Text,
  Icon,
} from "@chakra-ui/react";
import { DarkModeSwitch } from "../DarkModeSwitch";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function ({ main }) {
  return (
    <React.Fragment>
      <Navbar />
      <Container>
        {/* <Header /> */}
        <Box d="flex" flexDir="row" justifyContent="center" width="100%" maxW="1264px" id="main">
          <Box
            id="content"
            d="flex"
            w="100%"
            maxW="1264px"
            flexDirection="row"
            alignItems="stretch"
            pt={6}
          >
            <Box w="100%">{main}</Box>
            <Box
              w="300px"
              //   bg="pink.100"
              flexShrink={0}
              display={["none", "none", "none", "block"]}
            >
              <Box>Right Sidebar</Box>
            </Box>
          </Box>
        </Box>
      </Container>

      <Footer />
      <DarkModeSwitch />
    </React.Fragment>
  );
}

const Header = () => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.50", dark: "gray.900" };
  const color = { light: "black", dark: "white" };
  return (
    <Box
      w="100%"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      minHeight="70px"
    ></Box>
  );
};
