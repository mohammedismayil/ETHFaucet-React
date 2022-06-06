// import React from 'react';
// import './App.css';
// import { useState, useEffect } from "react";

// import Web3 from 'web3';
// const web3 = new Web3(
//   new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/b0dacabd219c4865941fc8bdeaea2888')
// );
// // let contractABI = [
// //   { inputs: [], stateMutability: "payable", type: "constructor" },
// //   {
// //     anonymous: false,
// //     inputs: [
// //       { indexed: true, internalType: "address", name: "from", type: "address" },
// //       {
// //         indexed: false,
// //         internalType: "uint256",
// //         name: "timestamp",
// //         type: "uint256",
// //       },
// //     ],
// //     name: "NewTx",
// //     type: "event",
// //   },
// //   {
// //     inputs: [],
// //     name: "getSentTime",
// //     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// //     stateMutability: "view",
// //     type: "function",
// //   },
// //   {
// //     inputs: [],
// //     name: "getTotalTxs",
// //     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// //     stateMutability: "view",
// //     type: "function",
// //   },
// //   {
// //     inputs: [{ internalType: "address", name: "", type: "address" }],
// //     name: "lastSentTime",
// //     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// //     stateMutability: "view",
// //     type: "function",
// //   },
// //   {
// //     inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
// //     name: "sendETHFromFaucet",
// //     outputs: [],
// //     stateMutability: "nonpayable",
// //     type: "function",
// //   },
// //   { stateMutability: "payable", type: "receive" },
// // ];
// function App() {
//    const [address, setAddress] = useState();
//   const [isMetaMaskEnabled, setMetaMask] = useState(false);
//   const [transactionHash, setTXHash] = useState();
//   const [errorMessage, setErrorMessage] = useState();
//    useEffect(() => {
//     checkIfWalletIsConnected(setAddress);
//   }, []);

//     async function checkIfWalletIsConnected(onConnected) {
//     if (window.ethereum) {
//       const chainId = 3; // Polygon Mainnet

//       console.log(window.ethereum.networkVersion);

//       const accounts = await window.ethereum.request({
//         method: "eth_accounts",
//       });

//       if (accounts.length > 0) {
//         const account = accounts[0];
//         // console.log("accounts length");
//         // console.log(account);
//         setMetaMask(true);
//         setAddress(account);
//         return;
//       }
//     } else {
//       alert("install metamask extension!!");
//     }
//   }
//     function connectToMetamask() {
//     if (window.ethereum) {
//       // Do something
//       console.log("Ethereum enabled");

//       const chainId = 3; // Polygon Mainnet

//       console.log(window.ethereum.networkVersion);
//       if (window.ethereum.networkVersion != chainId) {
//         alert("Change to ropsten testnet");
//       } else {
//         window.ethereum
//           .request({ method: "eth_requestAccounts" })
//           .then((res) => {
//             // Return the address of the wallet
//             // console.log(res[0]);

//             setMetaMask(true);
//             setAddress(res[0]);
//           });
//       }
//     } else {
//       alert("install metamask extension!!");
//     }
//   }

//   // function handleSubmit(e) {
//   //   e.preventDefault();
//   //   console.log("You clicked submit.");
//   //   console.log(address);
//   // }

//   async function sendErcToken() {
//     let tokenAddress = "0x0976307C69763eAE4DF205471bfcc9e1c451Ee02"; // Demo Token contract address
//     // let fromAddress = "0xd565a55b83fd384894f1165a69b649fd9372fc65"; // your wallet

//     // The Contract object
// let daiContract = new web3.eth.Contract(contractABI, tokenAddress);
//     const totalTxs = await daiContract
//       .sendETHFromFaucet(1000)
//       .then((result) => {
//         setTXHash(result["hash"]);
//       })
//       .catch((error) => {
//         console.error(error["message"]);
//         setTXHash("");
//         setErrorMessage("Try after one day");
//       });

//     console.log(totalTxs);
//     // setTXHash(totalTxs["hash"]);
//   }
//     return (
//     <div className=" flex-col flex  m-auto items-center bg-slate-200 h-screen ">
//       <div className="bg-white p-10 rounded font-bold m-10 items-center w-1/2 ">
//         <h2 className="font-bold text-3xl text-center">ETH Testnet faucet</h2>
//         {/* <Link to="/address">Home</Link> */}
//         {isMetaMaskEnabled ? (
//           <div className="flex justify-center content-center p-10">
//             <h2>Wallet connected:{address}</h2>
//           </div>
//         ) : (
//           <div className="flex justify-center content-center p-10">
//             Wallet Not connected
//           </div>
//         )}
//         <div className="flex justify-center content-center ">
//           <button
//             type="submit"
//             onClick={isMetaMaskEnabled ? sendErcToken : connectToMetamask}
//             className=" w-1/4 flex justify-center content-center py-2   border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             {isMetaMaskEnabled ? "Send ETH" : "Connect Wallet"}
//           </button>
//         </div>
//         {transactionHash ? (
//           <div className="flex justify-center content-center ">
//             <h3 className="pt-10  mx-5 justify-center content-center text-center">
//               Transaction Hash: {transactionHash}
//             </h3>
//           </div>
//         ) : null}

//         {errorMessage ? (
//           <div className="flex justify-center content-center ">
//             <h3 className="pt-10  mx-5 justify-center content-center text-center">
//               {errorMessage}
//             </h3>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// }

// export default App;