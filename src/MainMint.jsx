import React, { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

import roboPunksNFT from "./RoboPunksNFT.json";

function MainMint({ accounts, setAccounts }) {
  const roboPunksNFTAddress = "0x3a67bFc7471575377494e3eE9B067C35379658Be";
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  const handleMint = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunksNFTAddress,
        roboPunksNFT.abi,
        signer
      );

      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        });
        console.log("response is", response);
      } catch (error) {
        console.log("error at handleMint function", error);
      }
    }
  };

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount((prevState) => prevState - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount((prevState) => prevState + 1);
  };

  return (
    <Flex justify='center' align='center' height='100vh' paddimBottom='150px'>
      <Box width='520px'>
        <div>
          <Text fontSize='48px' textShadow='0 5px #000000'>
            RoboPunks
          </Text>
          <Text
            fontSize='30px'
            letterSpacing='-5.5%'
            fontFamily='VT323'
            textShadow='0 2px 2px #000000'>
            It's 2078. Can the RoboPunks NFT save the humans from destructive
            rampant NFT speculation? Mint RoboPunks to find out!
          </Text>
        </div>
        {isConnected ? (
          <div>
            <Flex justify='center' align='center'>
              <Button
                backgroundColor='#d6517d'
                borderRadius='5px'
                boxShadow='0 2px 2px 1px #0f0f0f'
                color='white'
                cursor='pointer'
                fontFamily='inherit'
                padding='15px'
                marginTop='10px'
                onClick={handleDecrement}>
                -
              </Button>
              <Input
                readOnly
                fontFamily='inhirit'
                width='100px'
                height='40px'
                textAlign='center'
                paddinLeft='19px'
                marginTop='10px'
                type='number'
                value={mintAmount}
              />
              <Button
                backgroundColor='#d6517d'
                borderRadius='5px'
                boxShadow='0 2px 2px 1px #0f0f0f'
                color='white'
                cursor='pointer'
                fontFamily='inherit'
                padding='15px'
                marginTop='10px'
                onClick={handleIncrement}>
                +
              </Button>
            </Flex>
            <Button
              backgroundColor='#d6517d'
              borderRadius='5px'
              boxShadow='0 2px 2px 1px #0f0f0f'
              color='white'
              cursor='pointer'
              fontFamily='inherit'
              padding='15px'
              marginTop='10px'
              onClick={handleMint}>
              Mint Now!
            </Button>
          </div>
        ) : (
          <Text
            marginTop='70px'
            fontSize='30px'
            letterSpacing='-5.5%'
            fontFamily='VT323'
            textShadow='0 3px 0 #000000'
            color='#d6517d'>
            You must be connected to mint.
          </Text>
        )}
      </Box>
    </Flex>
  );
}

export default MainMint;
