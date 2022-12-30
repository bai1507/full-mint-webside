require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config('/.env');
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter")
require("solidity-coverage")

//npm安装后dotenv后，记得导入包如上所示

const GOERLI_NEW_WORK = process.env.GOERLI_NEW_WORK
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  //有默认的网络,一般测试部署都在这个网络上
  //defaultNetwork:"hardhat"
  networks:{
    goerli:{
      url:GOERLI_NEW_WORK,
      accounts:[PRIVATE_KEY],
      chainId:5
    },
    localhost:{
    //将本地网络和节点网络连接
      url:"http://127.0.0.1:8545/",
      chainId:31337
    }
  }, 
  solidity: "0.8.17",
  etherscan:{
    apiKey:ETHERSCAN_API_KEY
  },
  // gasReporter:{
  //   enabled:true,
  //   outputFile:"gas-report.txt",
  //   currency:"USD",
  //   noColors:true,
  //   coinmarketcap:COINMARKETCAP_API_KEY,
  //   token:"ETH"
  // }
};
 