"use client";
import { ethers } from "ethers";
import React, { useState, createContext, useEffect } from "react";
import contractJSON from "./MonkeyNFT.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContext = createContext();
const contractAddress = "0x5f8B32aaF7a2ba3Bf2113af973B6A5bE0504730c";
const contractABI = contractJSON.abi;

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    account: "",
    monkeyNFT: null,
  });

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const polygonMumbaiChainId = "0x13881";
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: polygonMumbaiChainId }],
        });
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = await new ethers.providers.Web3Provider(
          window.ethereum
        );
        const signer = await provider.getSigner();
        const monkeyNFT = await new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setState({
          provider,
          signer,
          account: account[0],
          monkeyNFT,
        });
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.warn("Please install Metamask");
    }
  };

  useEffect(() => {
    const getConnectedAccounts = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const account = await window.ethereum.request({
            method: "eth_accounts",
          });
          const provider = await new ethers.providers.Web3Provider(
            window.ethereum
          );
          const signer = await provider.getSigner();
          const monkeyNFT = await new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          if (account.length > 0) {
            setState({
              provider,
              signer,
              account: account[0],
              monkeyNFT,
            });
          } else {
            toast.warn("Please connect wallet!");
          }
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.warn("Please install Metamask");
      }
    };

    getConnectedAccounts();
  }, []);
  return (
    <>
      <AppContext.Provider value={{ connectWallet, ...state }}>
        {children}
      </AppContext.Provider>
      <ToastContainer />
    </>
  );
};

export default AppProvider;
export { AppContext };
