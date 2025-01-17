import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  LinkBox,
  LinkOverlay,
  Input,
  useNumberInput,
  HStack,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { ProductType, GlobalContext } from "../../context/GlobalState";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { MotionBox } from "../ProductCard";
import { Skeleton } from "@material-ui/lab";

type Props = {
  product: ProductType;
};

// Give the components chakra props
export const HeartIcon = chakra(BsHeart);
export const HeartIconFill = chakra(BsHeartFill);
export const TrashIcon = chakra(BiTrash);

const CartItemMobile = ({ product }: Props) => {
  const toast = useToast();
  const subTotal = +product.price * +product.quantity!;
  const {
    deleteFromCart,
    incrementQty,
    decrementQty,
    toggleSaved,
  } = useContext(GlobalContext);

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput();
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <MotionBox
      display={{ base: "block", bigTablet: "none" }}
      opacity={1}
      // animation
      // initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      layout
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 30,
      }}
    >
      <MotionBox
        display={{ base: "flex", bigTablet: "none" }}
        flexDirection="column"
        boxShadow="base"
        p={3}
        mb={4}
        rounded="base"
        // animation
        exit={{ opacity: 0 }}
      >
        <Flex
          as={LinkBox}
          p={1}
          borderBottom="1px solid"
          borderColor="blackAlpha.200"
          _hover={{
            ".product-title": {
              color: "appBlue.600",
            },
          }}
        >
          <Flex align="center" justify="center" w="120px" h="120px" mr={2}>
            <Image
              data-src={product.image}
              className="lazyload"
              maxW="100%"
              maxH="100%"
              objectFit="contain"
            />
            <Box w="120px" h="120px">
              <Skeleton
                height="120px"
                style={{ transform: "none" }}
                animation="wave"
              />
            </Box>
          </Flex>
          <Flex direction="column" flex={1}>
            <Box>
              <LinkOverlay
                as={RouterLink}
                to={{ pathname: `products/${product.id}` }}
                className="product-title"
              >
                <Text fontWeight="medium">{product.title}</Text>
              </LinkOverlay>
            </Box>
            <Box mt={2} fontWeight="bold" fontSize="lg" color="appBlue.600">
              ${subTotal.toFixed(2)}
            </Box>
          </Flex>
        </Flex>

        <Flex mt={3}>
          <Button
            colorScheme="red"
            variant="ghost"
            size="md"
            onClick={() => {
              toast({
                title: product.isSaved
                  ? "Product successfully removed from your saved items"
                  : "Product successfully added to your saved items",
                status: "success",
                duration: 1500,
                isClosable: true,
              });
              toggleSaved!(product.id);
            }}
            px={2}
            borderRight="1px solid"
            borderColor="blackAlpha.200"
          >
            {product.isSaved ? <HeartIconFill /> : <HeartIcon />}
          </Button>
          <Button
            colorScheme="red"
            variant="ghost"
            size="md"
            px={2}
            onClick={() => deleteFromCart!(product.id)}
          >
            <TrashIcon
              mr={1}
              sx={{ "@media(max-width:365px)": { marginRight: 0 } }}
            />
            <Box
              as="span"
              fontSize="sm"
              sx={{ "@media(max-width:365px)": { display: "none" } }}
            >
              Remove Item
            </Box>
          </Button>
          <HStack
            spacing={1}
            w="100px"
            justify="center"
            align="center"
            ml="auto"
          >
            <Button
              size="xs"
              colorScheme="appBlue"
              rounded="full"
              {...dec}
              disabled={+product.quantity! === 1}
              onClick={() => decrementQty!(product.id)}
              w="17.5%"
            >
              <MinusIcon />
            </Button>
            <Input
              size="sm"
              {...input}
              value={product.quantity}
              readOnly
              pattern="^[-+]?[0-9]\d*(\.\d+)?$"
              w="65%"
              textAlign="center"
              border="none"
              borderBottom="1px solid #00000014"
            />
            <Button
              size="xs"
              colorScheme="appBlue"
              rounded="full"
              {...inc}
              disabled={+product.quantity! === 10}
              onClick={() => incrementQty!(product.id)}
              w="17.5%"
            >
              <AddIcon />
            </Button>
          </HStack>
        </Flex>
      </MotionBox>
    </MotionBox>
  );
};

export default CartItemMobile;
