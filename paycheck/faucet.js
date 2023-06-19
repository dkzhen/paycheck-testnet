const { ethers } = require("ethers");
const dotenv = require("dotenv");
dotenv.config();
const contractABI = [
  {
    inputs: [
      { internalType: "address", name: "_contractAddress", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractAddress",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

// Ethereum provider
const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER);

// Wallet connected to an Ethereum account
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

// Contract address
const contractAddress = "0x64DD6d5E56B311D85cE1672e2547E0a9C48fe72D";

// Contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function faucet() {
  const claim = await contract.claim();
  await claim.wait();

  console.log(
    `Tokens CHECK in contract successfully claim! https://goerli.etherscan.io/tx/${claim.hash}`
  );
}
module.exports = faucet;
