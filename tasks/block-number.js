const {task}=require("hardhat/config");

task("block-number","Prints the current block number").setAction(
    async(taskArgs, hre) =>{//async isimsiz fonksiyon oluşturduk içindekiler parametreler hre hadrhat run time enviroment yani hardhatın ulaştığı butun packagelara ulaşıyo ethers gibi
       const blockNumber=await  hre.ethers.provider.getBlockNumber();
       console.log(`Block number : ${blockNumber}`);
    }
)