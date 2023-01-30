import { Flex, FlexProps } from "@chakra-ui/react";
import ImageryLayout from "./layouts/ImageryLayout";
import Navbar from "../universal-components/Navbar";

const ImageryPage = (props: FlexProps) => {
  return (
    <Flex direction="column" flex="1">
      <Navbar />
      <Flex
        as="main"
        role="main"
        direction="column"
        flex="1"
        px="16"
        py="1"
        {...props}
      >
        <ImageryLayout />
      </Flex>
    </Flex>
  );
};

export default ImageryPage;
