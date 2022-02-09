import React from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useDisclosure, Button, Flex, Center } from '@chakra-ui/react';

import NavLink from './NavLink';

export default function CustomDrawer() {
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button ref={btnRef} size='sm' onClick={onOpen}>
        <HamburgerIcon />
      </Button>

      {/* Drawer */}
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <Center h='full'>
              <Flex flexDir='column' justifyContent='space-around' h='30%'>
                <NavLink route='/' onClose={onClose}>
                  Explore
                </NavLink>
                <NavLink route='/offers' onClose={onClose}>
                  Offers
                </NavLink>
                <NavLink route='/profile' onClose={onClose}>
                  Profile
                </NavLink>
              </Flex>
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
