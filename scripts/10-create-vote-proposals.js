import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// Our voting contract
const voteModule = sdk.getVoteModule(
  "0xAbc375514Ac579a76f970bBa287e90083BA23D4D"
);

// Our ERC-20 contract
const tokenModule = sdk.getTokenModule(
  "0x00De76B5cD28Cb1792c5a4EF697423C451a2176b"
);

(async () => {
  try {
    const amount = 30000;
    // Create proposal to mint 5000 new token to the treasury
    await voteModule.propose(
      "Should the DAO mint an additional " + amount + " tokens into the treasury?",
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            "mint",
            [
              voteModule.address,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),
          toAddress: tokenModule.address
        }
      ]
    );

    console.log("Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("Failed to create the first proposal", error);
    process.exit(1);
  }

  try {
    const amount = 5000;
    // Create proposal to transfer ourselves 5000 token for being awesome!
    await voteModule.propose(
      "Should the DAO transfer " +
      amount + " tokens from the treasury to " +
      process.env.WALLET_ADDRESS + " for being awesome?",
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            "transfer",
            [
              process.env.WALLET_ADDRESS,
              ethers.utils.parseUnits(amount.toString(), 18)
            ]
          ),
          toAddress: tokenModule.address
        }
      ]
    );
    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error("Failed to create first proposal", error);
  }
})();