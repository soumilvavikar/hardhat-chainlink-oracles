const { expect } = require("chai");
const { BigNumber } = require('bignumber.js');

describe("Test Price Consumer V3 Contract", function () {

  async function deployContractsFixture() {

    //deploy mock oracle
    const MockV3Aggregator = await ethers.getContractFactory("MockV3Aggregator");
    const mockV3Aggregator = await MockV3Aggregator.deploy("18", "1000");

    //deploy mock oracle
    const PriceConsumer = await ethers.getContractFactory("PriceConsumerV3");
    const priceConsumer = await PriceConsumer.deploy(mockV3Aggregator.address);

    return { mockV3Aggregator, priceConsumer };
  }

  describe("Testing the AggregatorV3 mock for the latest round data function", function () {
    it("The mock AggregatorV3 should return the initially set latest price", async function () {
      const { priceConsumer } = await deployContractsFixture();

      const answer = await priceConsumer.getLatestPrice();

      expect(Number(answer)).to.equal(1000);
    });

    it("The Mock AggregatorV3 should return the updated price", async function () {
      const { mockV3Aggregator, priceConsumer } = await deployContractsFixture();

      mockV3Aggregator.updateAnswer("2000");

      const answer = await priceConsumer.getLatestPrice();
      expect(Number(answer)).to.equal(2000);
    });
  });

  describe("Testing functions in PriceConsumerV3 contract", function () {
    it("Correct USD value for the ether price should be returned", async function () {
      const { priceConsumer } = await deployContractsFixture();

      const etherValueInUSD = await priceConsumer.getConversionRate(200000000000000000n);
      expect(Number(etherValueInUSD)).to.equal(200);
    });


    it("Get Version API should return the correct version", async function () {
      const { priceConsumer } = await deployContractsFixture();
      
      const version = await priceConsumer.getVersion();

      // Because mock interface returns 0 version
      expect(Number(version)).to.equal(0);
    });
  });
})