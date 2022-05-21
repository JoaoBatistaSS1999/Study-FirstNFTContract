import React from "react";
import { Box, Button, Flex, Image, Link, Spacer } from "@chakra-ui/react";
import Facebook from "./assets/social-media-icons/facebook_32x32.png";
import Twitter from "./assets/social-media-icons/twitter_32x32.png";
import Email from "./assets/social-media-icons/email_32x32.png";

const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    } else {
      console.log("install metamask");
    }
  };

  return (
    <Flex justify='space-between' align='center' padding='30px'>
      <Flex justify='space-around' width='40%' padding='0px 75px'>
        <Link href='https://github.com/JoaoBatistaSS1999'>
          <Image src={Facebook} boxSize='42px' margin='0px 15px' />
        </Link>
        <Link href='https://github.com/JoaoBatistaSS1999'>
          <Image src={Twitter} boxSize='42px' margin='0px 15px' />
        </Link>
        <Link href='https://github.com/JoaoBatistaSS1999'>
          <Image src={Email} boxSize='42px' margin='0px 15px' />
        </Link>
      </Flex>

      <Flex justify='space-around' align='center' width='40%' padding='30px'>
        <Box margin='0px 15px'>About</Box>
        <Spacer />
        <Box margin='0px 15px'>Mint</Box>
        <Spacer />
        <Box margin='0px 15px'>Team</Box>
        <Spacer />

        {isConnected ? (
          <Box margin='0px 15px'>Connected</Box>
        ) : (
          <Button
            backgroundColor='#d6517d'
            borderRadius='5px'
            boxShadow='0 2px 2px 1px #0f0f0f'
            color='white'
            cursor='pointer'
            fontFamily='inhirit'
            padding='15px'
            margin='0 15px'
            onClick={connectWallet}>
            Connect
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
