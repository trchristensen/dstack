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
import { RiHome2Fill, RiHome2Line, RiPriceTag2Fill, RiPriceTag2Line, RiQuestionAnswerFill, RiQuestionAnswerLine, RiUser2Fill, RiUserFollowFill, RiUserFollowLine } from "react-icons/ri";

const SidebarTemplate = ({ main, header = null, titleSection = null }) => {
  return (
    <Box background="gray.200"> 
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
            // w="164px"
            w="80px"
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
            // borderRightWidth={1}
            pt={6}
            // bg="gray.100"
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
                // pr={4}
              >
                <Stack spacing={4}>
                  <Box height="400px" rounded="md" bg="gray.100"></Box>
                  <Box height="400px" rounded="md" bg="gray.100"></Box>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* <Footer /> */}
      <DarkModeSwitch />
    </Box>
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
    <Box w="100%" pr={4} pt={2}>
      {/* {NAV_ITEMS.map((link, idx) => (
        <LinkItem key={idx} {...link} />
      ))} */}
      <Stack spacing={5} color="gray.600">
        <Box d="flex" justifyContent="flex-end" title="Home">
          <Icon fontSize="3xl" as={RiHome2Line} />
        </Box>
        <Box d="flex" justifyContent="flex-end" title="Questions">
          <Icon fontSize="3xl" as={RiQuestionAnswerLine} />
        </Box>
        <Box d="flex" justifyContent="flex-end" title="Tags">
          <Icon fontSize="3xl" as={RiPriceTag2Line} />
        </Box>
        <Box d="flex" justifyContent="flex-end" title="Users">
          <Icon fontSize="3xl" as={RiUserFollowLine} />
        </Box>
      </Stack>
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