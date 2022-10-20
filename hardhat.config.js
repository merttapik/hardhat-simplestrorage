require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("hardhat-gas-reporter");
/** @type import('hardhat/config').HardhatUserConfig */
const GOERLI_RPC_URL=process.env.GOERLI_RPC_URL;//KULLANMAK ICIN yarn add --dev dotenv // || "https://eth-rinkby/example"
const PRIVATE_KEY=process.env.PRIVATE_KEY;//|| "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    goerli:{
      url:GOERLI_RPC_URL,
      accounts:[PRIVATE_KEY],
      cainId:5//chainlist.org tan bulabilirsin
    },
    localhost:{// yarn hardhat run scripts/deploy.js --network localhost ile başka terminalden deploy edebilirsin
      url:"http://127.0.0.1:8545/",// yarn hardhat node yazınca gelen hostumuz
      // accounts: hardhat sağlıyor
      chainId: 31337,
    }
  },
  solidity: "0.8.8",
  etherscan:{
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter:{
    enabled:"true",
  //  outputFile:"gas-report.txt",
   // noColors:true,
   // currency:"USD",
   // coinmarketcap:coinmarket api key yazılacak commenteki herşey eğer dosyaya çıkarmka istersek
   //token:"MATIC" polygon a atma bedeli 
  }
};
