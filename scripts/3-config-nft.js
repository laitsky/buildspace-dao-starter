import sdk from './1-initialize-sdk.js';
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x430DFd486002f4dC4960553dE8d9C8b187B4Aa71"
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Supersword",
        description: "The weapon to fight the injustice",
        image: readFileSync("scripts/assets/Supersword.jpeg")
      }
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()