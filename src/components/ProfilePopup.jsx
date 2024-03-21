import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Image, Text } from "@chakra-ui/react";

const ProfilePopup = ({ isOpen, onClose, user }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{user.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={user.image} alt={user.name} boxSize="150px" borderRadius="full" mx="auto" mb={4} />
          <Text>{user.bio}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProfilePopup;
