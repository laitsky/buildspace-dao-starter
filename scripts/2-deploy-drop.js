import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0xc4c7Ec37CD22E0Ba7106353BAb7025b83CAfc95F");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: "AnythingDAO Membership",
      description: "We gonna do everything and anything with our money!",
      image: readFileSync("scripts/assets/anything-dao.jpeg"),
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    console.log(
      "Successfully deployed bundleDrop module, address: ",
      bundleDropModule.address,
    );
    console.log(
      "bundleDrop metadata: ",
      await bundleDropModule.getMetadata(),
    );
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})()