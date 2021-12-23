import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule("0xc4c7Ec37CD22E0Ba7106353BAb7025b83CAfc95F");

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "AIP-0001: The First Step",
      votingTokenAddress: "0x00De76B5cD28Cb1792c5a4EF697423C451a2176b",
      // Start immediately
      proposalStartWaitTimeInSeconds: 0,
      proposalVotingTimeInSeconds: 24 * 60 * 60,
      votingQuorumFraction: 0,
      minimumNumberOfTokensNeededToPropose: "0", 
    });
    console.log(
      "Successfully deployed vote module, address: ",
      voteModule.address
    );
  } catch (err) {
    console.log("Failed to deploy vote module", err);
  }
})();