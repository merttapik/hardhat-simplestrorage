
const {ethers,run,network}=require("hardhat"); //runı ekleyerek hardhatin terminalde yaptıklarını otomatik edecez verify fonksiyonunda
//network ekleme sebbimiz hangi networkte oldugumuzu anlasınki hardhatte ise verify işlemi yapmaya gerek yok
const hre = require("hardhat");

async function main() {
 const SimpleStorageFactory=await ethers.getContractFactory(
  "SimpleStorage"
 );
 console.log("Deploying contract");
 const simpleStorage=await SimpleStorageFactory.deploy();
 await simpleStorage.deployed();// private key ve rpc urli vermedendeploy etmis olduk bunun sebebi hardhat arka planda kendi çalıştırıyor olması
 //yarn hardhat run scripts/deploy.js --network hardhat yaparak networku değiştirebilirsin 
 console.log(network.config);
 if(network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY ){ //varsa etherscan true döner
  await simpleStorage.deployTransaction.wait(6);//etherscan hemen anlamaz diye 6 blok bekle
  console.log("waitting for block txes...");
  await verify(simpleStorage.address,[]);
 }
 const currentValue=await simpleStorage.retrieve();
 console.log(`Current value is: ${currentValue}`);
 //update current value
 const transactionResponse= await simpleStorage.store(7);
 await transactionResponse.wait(1);
 const updatedValue= await simpleStorage.retrieve();
 console.log(`Updated value ${updatedValue}`);

};
async function verify(contractAdrress,agrs){ //args arguments demek //hardhatte verify yapmaya gerek yok
  console.log("Verifying contract");
  try {//onceden verify olmuş kontratsa hata verir
    await run("verify:verify",{
      adrress: contractAdrress,
      constructorArguments:args,
  });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
