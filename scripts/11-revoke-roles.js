import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
  "0x00De76B5cD28Cb1792c5a4EF697423C451a2176b"
);

(async () => {
  try {
    console.log(
      "Roles that exist right now: ",
      await tokenModule.getAllRoleMembers()
    );

    // Revoke all the superpowers your wallet had over the ERC-20 contrract.
    await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
    console.log(
      "Roles after revoking ourselves",
      await tokenModule.getAllRoleMembers()
    );
    console.log("Successfully revoked our superpowers from the ERC-20 contract");
  } catch (error) {
    console.error("Failed to revokue ourselves from the DAO treasury", error);
  }
})();