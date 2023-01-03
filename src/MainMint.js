import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import robertPunksNFT from "./RobertPunksNFT.json";
import {
  Box,
  Button,
  Input,
  Flex,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton
} from "@chakra-ui/react";

const RobertPunksAddress = "0x123E90FeDED0127008990761d8798f1CDBdD201E";
const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);
  const [isError,setIsError] = useState(false)
  const [title,setTitle] =useState("");
  const [content,setContent] =useState("");

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        RobertPunksAddress,
        robertPunksNFT.abi,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        });
        console.log("response:", response);
      } catch (error) {
        console.log("error:", error);
        const mes = error.error.message.toString()
        setIsError(!isError)
        setTitle(mes.split(":")[0])
        setContent(mes.split(":")[1])

        // alert(error.error.message);
      }
    }
  }
  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };
  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };
  const checkError = () => {
    setIsError(!isError)
};
  return (
    <Flex
      justify={"center"}
      align="center"
      height="100vh"
      paddingBottom="150px"
    >
      <Box width={"520px"}>
        <Flex width="350px" justify={"center"} align="center" display={isError?"block":"none"}>
          <Alert status="error" background="rgba(0,0,0,0.8)" 
          position="relative"
          top="50%"
          left="50%"
          transform="translate(30px, 40px)">
            <AlertIcon  />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
              {content}
            </AlertDescription>
            <CloseButton
        alignSelf='flex-start'
        position='relative'
        right={-1}
        top={-1}
        onClick={checkError}
      />
          </Alert>
          
        </Flex>
        <Box>
          <Text
            fontSize={"48px"}
            fontFamily={"Press Start 2P"}
            textShadow="0 5px #000000"
          >
            RobertPunks
          </Text>
          <Text
            fontSize={"30px"}
            letterSpacing="-5.5%"
            fontFamily={"VT323"}
            textShadow="0 2px 2px #000000"
          >
            welcome to RobertPunks,NFT conllection for the best! Mint
            RobertPunks to find out{" "}
          </Text>
          {isConnected ? (
            <div>
              <Flex align={"center"} justify="center">
                <Button
                  backgroundColor={"#D6517D"}
                  borderRadius="5px"
                  boxShadow={"0px 2px 2px 1px #0f0f0f"}
                  color="white"
                  cursor={"pointer"}
                  fontFamily="inherit"
                  padding={"15px"}
                  marginTop="10px"
                  onClick={handleDecrement}
                >
                  -
                </Button>
                <Input
                  readOnly
                  fontFamily={"inherit"}
                  width="100px"
                  height={"40px"}
                  textAlign="center"
                  paddingLeft={"19px"}
                  marginTop="10px"
                  type="number"
                  value={mintAmount}
                />
                <Button
                  backgroundColor={"#D6517D"}
                  borderRadius="5px"
                  boxShadow={"0px 2px 2px 1px #0f0f0f"}
                  color="white"
                  cursor={"pointer"}
                  fontFamily="inherit"
                  padding={"15px"}
                  marginTop="10px"
                  onClick={handleIncrement}
                >
                  +
                </Button>
              </Flex>
              <Button
                backgroundColor={"#D6517D"}
                borderRadius="5px"
                boxShadow={"0px 2px 2px 1px #0f0f0f"}
                color="white"
                cursor={"pointer"}
                fontFamily="inherit"
                padding={"15px"}
                marginTop="10px"
                onClick={handleMint}
              >
                Mint Now
              </Button>
            </div>
          ) : (
            <Text
              marginTop={"70px"}
              fontSize="30px"
              letterSpacing={"-5.5%"}
              fontFamily="VT323"
              textShadow={"0 3px #000000"}
              color="#D6517D"
            >
              You must be Connected to Mint.
            </Text>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default MainMint;
