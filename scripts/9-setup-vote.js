import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// Governance contract
const voteModule = sdk.getVoteModule(
  "0xAbc375514Ac579a76f970bBa287e90083BA23D4D"
);

// ERC-20 contract
const tokenModule = sdk.getTokenModule(
  "0x00De76B5cD28Cb1792c5a4EF697423C451a2176b"
);

(async () => {
  try {
    // Give treasury the power to mint additional tokens if needed
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "Failed to grant vote module permissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 90% of the supply that we hold.
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent90 = ownedAmount.div(100).mul(90);

    // Grab 90% of the supply to our voting contract
    await tokenModule.transfer(
      voteModule.address,
      percent90
    );

    console.log("Successfully transferred token to vote module");
  } catch (err) {
    console.error("Failed to transfer tokens to vote module", err);
  }
})();