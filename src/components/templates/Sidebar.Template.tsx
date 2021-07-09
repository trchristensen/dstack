import React from "react";
import Navbar from "../Navbar";
// import Footer from "../Footer";
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
import { NAV_ITEMS } from '../../constants'

const SidebarTemplate = ({ main, header = null, titleSection = null }) => {
  return (
    <React.Fragment>
      <Navbar />
      <Container>
        {/* <Header /> */}
        {header}
        <Box
          d="flex"
          flexDir="row"
          id="main"
          w="100%"
          maxW="1264px"
          justifyContent="center"
        >
          <Box
            id="left-sidebar"
            w="164px"
            d="flex"
            alignItems="flex-start"
            flexShrink={0}
            display={["none", "none", "block", "block"]}
            pt={6}
            //   bg="pink.100"
          >
            <LeftSideBar />
          </Box>
          <Box
            id="content"
            d="flex"
            w="100%"
            maxW="1264"
            flexDirection="column"
            alignItems="stretch"
            borderLeftWidth={1}
            pt={6}
            
          >
            {titleSection && (
              <Box w="100%" borderBottomWidth={1} px={4}>
                {titleSection}
              </Box>
            )}

            <Box d="flex" flexDir="row" id="content-body">
              <Box w="100%">{main}</Box>
              <Box
                w="300px"
                  // bg="gray.100"
                flexShrink={0}
                display={["none", "none", "none", "block"]}
              >
                {/* <Box>Right Sidebar</Box> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* <Footer /> */}
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

const LeftSideBar = () => {
  return (
    <Box w="100%">
      {NAV_ITEMS.map((link, idx) => (
        <LinkItem key={idx} {...link} />
      ))}
    </Box>
  );
};

const LinkItem = (props) => {
  const router = useRouter();

  return (
    <Box
      role={"group"}
      display={"block"}
      p={2}
      bg={router.pathname === props.href ? `gray.500` : ``}
      _hover={{ bg: useColorModeValue("gray.500", "gray.900") }}
    >
      <Link href={props.href}>
        <a>
          <Stack direction={"row"} align={"center"}>
            <Box>
              <Text
                as="span"
                transition={"all .3s ease"}
                _groupHover={{ color: "gray.100" }}
                color={
                  router.pathname === props.href ? `gray.100` : `initial`
                }
                //   fontWeight={500}
              >
                {props.label}
              </Text>
              {/* <Text fontSize={"sm"}>{props.subLabel}</Text> */}
            </Box>
            <Flex
              transition={"all .3s ease"}
              transform={
                router.pathname === props.href
                  ? `translateX(-0)`
                  : `translateX(-10px)`
              }
              opacity={router.pathname === props.href ? `1` : `0`}
              _groupHover={{
                opacity: "100%",
                transform:
                  router.pathname === props.href ? `` : `translateX(0)`,
              }}
              justify={"flex-end"}
              align={"center"}
              flex={1}
            >
              <Icon color={"gray.400"} w={5} h={5} as={ChevronRightIcon} />
            </Flex>
          </Stack>
        </a>
      </Link>
    </Box>
  );
};

export default SidebarTemplate;