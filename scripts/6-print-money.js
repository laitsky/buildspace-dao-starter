import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
  "0x00De76B5cD28Cb1792c5a4EF697423C451a2176b"
);

(async () => {
  try {
    // Max supply
    const amount = 100_000;
    // We use the util function from "ethers" to convert the amount
    // to have 18 decimals (which is the standard for ERC20 tokens).
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    // Interact with your deployed ERC-20 contract and mint the tokens!
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();

    console.log(
      "✅ There now is",
      ethers.utils.formatUnits(totalSupply, 18),
      "$KNIGHT in circulation",
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();