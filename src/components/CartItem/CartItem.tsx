import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  Select,
  LinkBox,
  LinkOverlay,
  useToast,
} from "@chakra-ui/react";
import { BsHeart as HeartIcon } from "react-icons/bs";
import { BsHeartFill as HeartIconFill } from "react-icons/bs";
import { BiTrash as TrashIcon } from "react-icons/bi";
import { ProductType, GlobalContext } from "../../context/GlobalState";
import { useContext, ChangeEvent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { MotionBox } from "../ProductCard";
import { Skeleton } from "@material-ui/lab";

type Props = {
  product: ProductType;
};

const CartItem = ({ product }: Props) => {
  const toast = useToast();
  const { setQuantity, deleteFromCart, toggleSaved } = useContext(
    GlobalContext
  );
  const subTotal = +product.price * +product.quantity!;

  return (
    <MotionBox
      display={{ base: "none", bigTablet: "block" }}
      opacity={1}
      // animation
      
    
      layout
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 30,
      }}
    >
      <MotionBox
        display={{ base: "none", bigTablet: "flex" }}
        boxShadow="base"
        mb={4}
        rounded="base"
        // animation
        exit={{ opacity: 0 }}
      >
        <Flex
          as={LinkBox}
          p={3}
          w="70%"
          borderRight="2px solid"
          borderColor="blackAlpha.200"
          _hover={{
            ".product-title": {
              color: "appBlue.600",
            },
          }}
        >
          <Flex align="center" justify="center" w="140px" h="140px" mr={4}>
            <Image
              data-src={product.image}
              className="lazyload"
              maxW="100%"
              maxH="100%"
              objectFit="contain"
            />
            <Box w="140px" h="140px">
              <Skeleton
                height="140px"
                style={{ transform: "none" }}
                animation="wave"
              />
            </Box>
          </Flex>
          <Flex direction="column" justify="space-between" overflow="auto">
            <Box>
              <LinkOverlay
                as={RouterLink}
                to={{ pathname: `products/${product.id}` }}
                className="product-title"
              >
                <Text fontWeight="medium">{product.title}</Text>
              </LinkOverlay>
            </Box>
            <Flex flexWrap="wrap" mt={2}>
              <Button
                leftIcon={product.isSaved ? <HeartIconFill /> : <HeartIcon />}
                colorScheme="red"
                variant="ghost"
                size="sm"
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
              >
                Save Item
              </Button>
              <Button
                leftIcon={<TrashIcon />}
                colorScheme="red"
                variant="ghost"
                size="sm"
                onClick={() => deleteFromCart!(product.id)}
              >
                Remove Item
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          w="30%"
          borderRight="2px solid"
          borderColor="blackAlpha.200"
          justify="center"
          align="center"
        >
          <Select
            size="sm"
            minW={12}
            maxW={16}
            m="auto"
            rounded="md"
            value={product.quantity}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setQuantity!(e.target.value, product.id)
            }
          >
            {Array(10)
              .fill("")
              .map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
          </Select>
        </Flex>
        <Flex
          w="30%"
          borderRight="2px solid"
          borderColor="blackAlpha.200"
          fontWeight="bold"
          fontSize="lg"
          justify="center"
          align="center"
        >
          ${product.price}
        </Flex>
        <Flex
          w="30%"
          fontWeight="bold"
          fontSize="lg"
          justify="center"
          align="center"
          color="appBlue.600"
        >
          ${subTotal.toFixed(2)}
        </Flex>
      </MotionBox>
    </MotionBox>
  );
};

export default CartItem;
