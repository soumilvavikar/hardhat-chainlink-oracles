// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    constructor(address _feedAddress) {
       priceFeed = AggregatorV3Interface(_feedAddress);
    }

    /**
     * Returns the latest price.
     */
    function getLatestPrice() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return price;
    }

    /**
     * This function will get the conversion rate
     */
    function getConversionRate(
        uint256 etherAmount
    ) external view returns (uint256) {
        int etherPrice = getLatestPrice();
        uint256 etherAmountInUSD = (uint256(etherPrice) * etherAmount)/1e18;
        return etherAmountInUSD;
    }

    /**
     * This method will help us get the version of the AggregatorV3Interface
     */
    function getVersion() external view returns (uint256) {
        return priceFeed.version();
    }
}
