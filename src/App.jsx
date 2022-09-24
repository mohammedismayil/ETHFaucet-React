import { ethers } from "ethers";

import React, { useEffect, useState } from "react";
import './App.css';

const provider = new ethers.providers.Web3Provider(ethereum);
// const signer = provider.getSigner();
const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
   const [transactionHash, setTXHash] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
       
    } else {
      console.log("No authorized account found");
    }
  }

  /*
  * Implement your connectWallet method here
  */

  let contractABI = [
  { inputs: [], stateMutability: "payable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "NewTx",
    type: "event",
  },
  {
    inputs: [],
    name: "getSentTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalTxs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastSentTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "sendETHFromFaucet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      /*
      * Fancy method to request access to account.
      */
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      /*
      * Boom! This should print out public address once we authorize Metamask.
      */
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
       
    } catch (error) {
      console.log(error);
    }
  }

  // Render Methods
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );
//
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  /*
  * Added a conditional render! We don't want to show Connect to Wallet if we're already connected :).
  */
  const sendErcToken = async () => {
  const CONTRACT_ADDRESS = "0x0976307C69763eAE4DF205471bfcc9e1c451Ee02";

  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      console.log("Going to pop wallet now to pay gas...")
      let nftTxn = await connectedContract.sendETHFromFaucet(10000000000000);

      console.log("Mining...please wait.")
      await nftTxn.wait();
      
      console.log(`Mined, see transaction: https://ropsten.etherscan.io/tx/${nftTxn.hash}`);

      setTXHash(nftTxn.hash);

    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}

 
  
      return (
    <div className=" flex-col flex  m-auto items-center bg-slate-200 h-screen ">
      <div className="bg-white p-10 rounded font-bold m-10 items-center w-1/2 ">
        <h2 className="font-bold text-3xl text-center">ETH Testnet faucet</h2>
         
        {currentAccount === ""  ? (
          renderNotConnectedContainer()
        ) : (
          <div className="flex justify-center content-center p-10">
            <h2>Wallet connected:{currentAccount}</h2>
          </div>
        )}
        <div className="flex justify-center content-center ">
          <button
            type="submit"
            onClick={currentAccount === ""  ? connectWallet : sendErcToken}
            className=" w-1/4 flex justify-center content-center py-2   border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {currentAccount === ""  ?"Connect Wallet" : "Send ETH"}
          </button>
        </div>
        {transactionHash ? (
          <div className="flex justify-center content-center ">
            <h3 className="pt-10  mx-5 justify-center content-center text-center">
              Transaction Hash: {transactionHash}
            </h3>
          </div>
        ) : null}

        {errorMessage ? (
          <div className="flex justify-center content-center ">
            <h3 className="pt-10  mx-5 justify-center content-center text-center">
              {errorMessage}
            </h3>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;