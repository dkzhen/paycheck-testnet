const faucet = require("./paycheck/faucet");
const cron = require("node-cron");

// Rest of your code...

// Schedule the faucet function to run every 24 hours
cron.schedule("0 0 * * *", async () => {
  try {
    await faucet();
  } catch (error) {
    console.error("Error running faucet:", error);
  }
});
