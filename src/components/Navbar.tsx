import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Input,
  InputLeftElement,
  InputGroup,
  useColorMode,
  FormControl,
  FormLabel,
  Checkbox,
  Avatar,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { SITE_NAME, NAV_ITEMS } from "../constants";
import keychainIcon from "../public/keychain.6846c271.png";
import { AuthContext, logOut } from "../lib/AuthProvider";
import { signinWithHiveKeychain } from "../lib/AuthProvider";
import { RiLogoutBoxLine, RiUser2Fill } from "react-icons/ri";
import SearchBar from "./templates/SearchBar";


export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode } = useColorMode();
  const bgColor = { dark: "gray.50", light: "gray.900" };
  const color = { dark: "black", light: "white" };

  const router = useRouter();
  const onSearch = (input) => {
    router.push(`/search?q=${input}`)
    
  }

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.600", "white")}
      minH={"60px"}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
      align={"center"}
      justify="space-between"
    >
      <Flex
        w="100%"
        maxW="1264"
        justifyContent="space-between"
        alignItems="center"
        px={2}
      >
        <Link href="/">
          {/* <a> */}
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            fontWeight="600"
            fontSize="2xl"
          >
            {SITE_NAME}
          </Text>
          {/* </a> */}
        </Link>
        <Flex
          display={{ base: "none", md: "flex" }}
          ml={10}
          w="full"
          maxW="600px"
          pos="relative"
        >
          <SearchBar onSearch={onSearch} />
        </Flex>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack
            pl={10}
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Login />
          </Stack>
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            // display={{ base: "flex", md: "none" }}
            display="flex"
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      // display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: any) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const Login = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const bgColor = { dark: "gray.50", light: "gray.900" };
  const color = { dark: "black", light: "white" };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasKeychain, setHasKeychain] = React.useState(false)

  const { user, setUser } = React.useContext(AuthContext);
  const [input, setInput] = React.useState("");

  
  React.useEffect(() => {
    if(window.hive_keychain) {
      setHasKeychain(true)
    } else {
      setHasKeychain(false)
    }
  },[])

  return (
    <React.Fragment>
      {user ? (
        <>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bg="none"
                  _hover={{ bg: "none" }}
                  _focus={{ bg: "none" }}
                >
                  <Avatar
                    src={`https://images.hive.blog/u/${user}/avatar/small`}
                    size="sm"
                    width="32px"
                    height="32px"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      logOut();
                      setUser("");
                    }}
                  >
                    Logout {user}
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </>
      ) : (
        <Button
          display={"inline-flex"}
          fontSize={"sm"}
          fontWeight={600}
          // color={"white"}
          // bg={"black"}
          href={"#"}
          _hover={{
            bg: "gray.500",
          }}
          bg={bgColor[colorMode]}
          color={color[colorMode]}
          minW="130px"
          borderRadius="full"
          onClick={onOpen}
        >
          <Text ml={2}>Connect</Text>
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box px={4} pb={8}>
            <ModalHeader px={0}>Login to {SITE_NAME}</ModalHeader>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                {/* <Input type="text" /> */}
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={RiUser2Fill} color="gray.300" />}
                  />
                  <Input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Username" />
                </InputGroup>
              </FormControl>

              <Stack spacing={0}>
                <Button
                  // disabled={!hasKeychain}
                  bg={"black"}
                  color={"white"}
                  _hover={{
                    bg: "black",
                  }}
                  // onClick={() => alert('hello')}

                  onClick={() => {
                    signinWithHiveKeychain(input, (res) => {
                      console.log("input", input);
                      if (res.success === true) {
                        console.log("response...", res);
                        setUser(res.data.username);
                      }
                    });
                    onClose();
                  }}
                >
                  Login with Hive Keychain
                  {/* <Image
                    src={keychainIcon}
                    alt="Hive Keychain Login"
                    // width="35px"
                    height="135px"
                  /> */}
                </Button>
              </Stack>
              {!hasKeychain && (
                <Box
                  mt={2}
                  p={2}
                  d="flex"
                  alignItems="center"
                  justifyContent="center"
                  rounded="md"
                  bg="red.200"
                  textAlign="center"
                >
                  <Text fontWeight="600">
                    "Please install Hive Keychain to Login"
                  </Text>
                </Box>
              )}
              <Link
                as="button"
                bg="blue.500"
                color="white"
                rounded="md"
                p={2}
                fontWeight="600"
                _hover={{ textDecoration: "none" }}
                href="https://hiveonboard.com?ref=ipeeyay"
                target="_blank"
              >
                <a>Sign Up</a>
              </Link>
            </Stack>
          </Box>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};
