import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0xc4c7Ec37CD22E0Ba7106353BAb7025b83CAfc95F");

(async () => {
  try {
    // Deploy a standard ERC-20 contract
    const tokenModule = await app.deployTokenModule({
      name: "AnythingDAO Governance Token",
      symbol: "KNIGHT",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenModule.address,
    );
  } catch (error) {
    console.error("failed to deploy token module", error);

  }
})();