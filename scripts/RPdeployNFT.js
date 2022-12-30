const { run,network } = require("hardhat");
const hre = require("hardhat");


async function main() {
  console.log("Deploying contract。。。")
  //合约名不是文件名
  //npx hardhat run scripts/RPdeployNFT.js 
  //npx hardhat run scripts/RPdeployNFT.js --network goerli
  const RobertPunks = await hre.ethers.getContractFactory("RobertPunksNFT");
  const rp = await RobertPunks.deploy();
  await rp.deployed();
  console.log(`Deployed contract to : ${rp.address}`);
  //verify contract
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY){
    console.log("Waiting for block txes。。。。")  
    await rp.deployTransaction.wait(3)
    await verify(rp.address,[])
  }
  
}

async function verify(contractAddress,args) {
  console.log("Verifying contract...")
  try{
      await run("verify:verify",{
        address:contractAddress,
        constructorArguments:args,
      })
  }catch(e){
      if(e.message.toLowerCase().includes("already verified")){
        console.log("Already Verified!")
      } else{
        console.log(e)
      }

  }

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
