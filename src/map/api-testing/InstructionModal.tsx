import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";

type InstructionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const InstructionModal = ({ isOpen, onClose }: InstructionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Instructions</ModalHeader>
        <ModalCloseButton />
        <ModalBody py="2">
          <OrderedList>
            <ListItem py="1">
              Select an API request from the dropdown menu in one of the request
              boxes.
            </ListItem>
            <ListItem py="1">
              Click the Fetch button to perform the request.
            </ListItem>
            <ListItem py="1">
              Click the Console button to log the response to the browser
              console.
            </ListItem>
            <ListItem py="1">
              You can click the Save button to save a response to local storage.
            </ListItem>
            <ListItem py="1">
              If you have saved a response and forked the repository, you can
              manipulate the response data using the corresponding function in
              the dataTestingFunctions.ts file. Click Test Data to log this to
              the console.
            </ListItem>
            <ListItem py="1">
              For API requests denoted with MAP in the dropdown selection, you
              can click the Apply To Map button to see requested imagery on the
              maps. This only works with the Leaflet map currently.
            </ListItem>
          </OrderedList>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InstructionModal;
