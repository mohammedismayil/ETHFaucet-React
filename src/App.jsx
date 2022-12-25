import { ethers } from "ethers";

import React, { useEffect, useState } from "react";
import './App.css';
import Web3 from 'web3';
// import Web3 from "web3";
const provider = new ethers.providers.Web3Provider(ethereum);

  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://goerli.infura.io/v3/b0dacabd219c4865941fc8bdeaea2888"
    )
  );
// const signer = provider.getSigner();

const PRIVATE_KEY =  "31f31a1674e45b7c5df4f1adfc7261c8a09ad3bc3e6dec6a23ac2a916e20e4e6";
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

//   let contractABI = [
//   { inputs: [], stateMutability: "payable", type: "constructor" },
//   {
//     anonymous: false,
//     inputs: [
//       { indexed: true, internalType: "address", name: "from", type: "address" },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "timestamp",
//         type: "uint256",
//       },
//     ],
//     name: "NewTx",
//     type: "event",
//   },
//   {
//     inputs: [],
//     name: "getSentTime",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getTotalTxs",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "address", name: "", type: "address" }],
//     name: "lastSentTime",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
//     name: "sendETHFromFaucet",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   { stateMutability: "payable", type: "receive" },
// ];
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
    <div className="flex justify-center content-center py-5">
<button onClick={connectWallet} className="flex justify-center content-center">
      Connect to Wallet
    </button>
    </div>
    
  );
//
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  /*
  * Added a conditional render! We don't want to show Connect to Wallet if we're already connected :).
  */

   
  // sendErcToken();

  async function sendErc20Token() {

    const FaucetAddress = "0xD565A55B83fD384894F1165A69B649fd9372Fc65";
   
 
    // const signer = provider.getSigner();
    // let contractABI = [
    //   {
    //     inputs: [],
    //     stateMutability: "nonpayable",
    //     type: "constructor",
    //   },
    //   {
    //     anonymous: false,
    //     inputs: [
    //       {
    //         indexed: true,
    //         internalType: "address",
    //         name: "owner",
    //         type: "address",
    //       },
    //       {
    //         indexed: true,
    //         internalType: "address",
    //         name: "spender",
    //         type: "address",
    //       },
    //       {
    //         indexed: false,
    //         internalType: "uint256",
    //         name: "value",
    //         type: "uint256",
    //       },
    //     ],
    //     name: "Approval",
    //     type: "event",
    //   },
    //   {
    //     anonymous: false,
    //     inputs: [
    //       {
    //         indexed: true,
    //         internalType: "address",
    //         name: "from",
    //         type: "address",
    //       },
    //       {
    //         indexed: true,
    //         internalType: "address",
    //         name: "to",
    //         type: "address",
    //       },
    //       {
    //         indexed: false,
    //         internalType: "uint256",
    //         name: "value",
    //         type: "uint256",
    //       },
    //     ],
    //     name: "Transfer",
    //     type: "event",
    //   },
    //   {
    //     inputs: [],
    //     name: "admin",
    //     outputs: [
    //       {
    //         internalType: "address",
    //         name: "",
    //         type: "address",
    //       },
    //     ],
    //     stateMutability: "view",
    //     type: "function",
    //   },
    //   {
    //     inputs: [
    //       {
    //         internalType: "address",
    //         name: "owner",
    //         type: "address",
    //       },
    //       {
    //         internalType: "address",
    //         name: "spender",
    //         type: "address",
    //       },
    //     ],
    //     name: "allowance",
    //     outputs: [
    //       {
    //         internalType: "uint256",
    //         name: "",
    //         type: "uint256",
    //       },
    //     ],
    //     stateMutability: "view",
    //     type: "function",
    //   },
    //   {
    //     inputs: [
    //       {
    //         internalType: "address",
    //         name: "spender",
    //         type: "address",
    //       },
    //       {
    //         internalType: "uint256",
    //         name: "amount",
    //         type: "uint256",
    //       },
    //     ],
    //     name: "approve",
    //     outputs: [
    //       {
    //         internalType: "bool",
    //         name: "",
    //         type: "bool",
    //       },
    //     ],
    //     stateMutability: "nonpayable",
    //     type: "function",
    //   },
    //   {
    //     inputs: [
    //       {
    //         internalType: "address",
    //         name: "account",
    //         type: "address",
    //       },
    //     ],
    //     name: "balanceOf",
    //     outputs: [
    //       {
    //         internalType: "uint256",
    //         name: "",
    //         type: "uint256",
    //       },
    //     ],
    //     stateMutability: "view",
    //     type: "function",
    //   },
    //   {
    //     inputs: [
    //       {
    //         internalType: "uint256",
    //         name: "amount",
    //         type: "uint256",
    //       },
    //     ],
    //     name: "burn",
    //     outputs: [],
    //     stateMutability: "nonpayable",
    //     type: "function",
    //   },
    //   {
    //     inputs: [],
    //     name: "decimals",
    //     outputs: [
    //       {
    //         internalType: "uint8",
    //         name: "",
    //         type: "uint8",
    //       },
    //     ],
    //     stateMutability: "view",
    //     type: "function",
    //   },
    //   {
    //     inputs: [
    //       {
    //         internalType: "address",
    //         name: "spender",
    //         type: "address",
    //       },
    //       {
    //         internalType: "uint256",
    //         name: "subtractedValue",
    //         type: "uint256",
    //       },
    //     ],
    //     name: "decreaseAllowance",
    //     outputs: [
    //       {
    //         internalType: "bool",
    //         name: "",
    //         type: "bool",
    //       },
    //     ],
    //     stateMutability: "nonpayable",
    //     type: "function",
    //   },
    //   {
    //     inputs: [
    //       {
    //         internalType: "address",
    //         name: "spender",
    //         type: "address",
    //       },
    //       {
    //         internalType: "uint256",
    //         name: "addedValue",
    //         type: "uint256",
    //       },
    //     ],
    //     name: "increaseAllowance",
    //     outputs: [
    //       {
    //         internalType: "bool",
    //         name: "",
    //         type: "bool",
    //       },
    //     ],
    //     stateMutability: "nonpayable",
    //     type: "function",
    //   },
    //   {
    //     inputs: [
    //       {
    //         internalType: "address",
    //         name: "to",
    //         type: "address",
    //       },
    //       {
    //         internalType: "uint256",
    //         name: "amount",
    //         type: "uint256",
    //       },
    //     ],
    //     name: "mint",
    //     outputs: [],
    //     stateMutability: "nonpayable",
    //     type: "function",
    //   },
    //   {
    //     inputs: [],
    //     name: "name",
    //     outputs: [
    //       {
    //         internalType: "string",
    //         name: "",
    //         type: "string",
    //       },
    //     ],
    //     stateMutability: "view",
    //     type: "function",
    //   },
    //   {
    //     inputs: [],
    //     name: "symbol",
    //     outputs: [
    //       {
    //         internalType: "string",
    //         name: "",
    //         type: "string",
    //       },
    //     ],
    //     stateMutability: "view",
    //     type: "function",
    //   },
    //   {
    //     inputs: [],
    //     name: "totalSupply",
    //     outputs: [
    //       {
    //         internalType: "uint256",
    //         name: "",
    //         type: "uint256",
    //       },
    //     ],
    //     stateMutability: "view",
    //     type: "function",
    //   },
    //   {
    //     inputs: [
    //       {
    //         internalType: "address",
    //         name: "to",
    //         type: "address",
    //       },
    //       {
    //         internalType: "uint256",
    //         name: "amount",
    //         type: "uint256",
    //       },
    //     ],
    //     name: "transfer",
    //     outputs: [
    //       {
    //         internalType: "bool",
    //         name: "",
    //         type: "bool",
    //       },
    //     ],
    //     stateMutability: "nonpayable",
    //     type: "function",
    //   },
    //   {
    //     inputs: [
    //       {
    //         internalType: "address",
    //         name: "from",
    //         type: "address",
    //       },
    //       {
    //         internalType: "address",
    //         name: "to",
    //         type: "address",
    //       },
    //       {
    //         internalType: "uint256",
    //         name: "amount",
    //         type: "uint256",
    //       },
    //     ],
    //     name: "transferFrom",
    //     outputs: [
    //       {
    //         internalType: "bool",
    //         name: "",
    //         type: "bool",
    //       },
    //     ],
    //     stateMutability: "nonpayable",
    //     type: "function",
    //   },
    // ];
    // const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
   
  

    // let amount = provider.utils.toHex(provider.utils.toWei("1")); //1 DEMO Token
  
    // let data = connectedContract.method.transfer(toAddress, amount).encodeABI();

    const nonce = await web3.eth.getTransactionCount(FaucetAddress, 'latest'); // nonce starts counting from 0

   
    const transaction = {
     'to': currentAccount, // faucet address to return eth
     'value': 1,
     'gas': 30000,
    //  'maxFeePerGas': 1000000108,
     'nonce': nonce,
     // optional data field to send message or execute smart contract
    };
   
  
    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
    
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
  }
  const sendErcToken = async () => {
  const CONTRACT_ADDRESS = "0x4d2169F89ffcfF7dB188c642d96bF1B07Da5638d";

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
        <h2 className="font-bold text-3xl  text-center">ETH Testnet faucet(Goerli)</h2>
         
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
            onClick={currentAccount === ""  ? connectWallet : sendErc20Token}
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