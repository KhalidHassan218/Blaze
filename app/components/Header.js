"use client";
import { AppContext } from "@/app/utils/assets/GlobalContext/AppProvider";
import Link from "next/link";
import { useContext } from "react";

const Header = () => {
  const { connectWallet, account, monkeyNFT } = useContext(AppContext);
  return (
    <header style={{maxWidth:'100%'}}  className="bg-purple-grad py-3">
      <nav className="flex justify-between flex-col lg:flex-row	 items-center w-[90%] mx-auto">
        <div className="lg:mb-0 mb-4">
          <Link href="/">
            <h1 className="font-bold text-3xl ">BLAZE</h1>
          </Link>
        </div>
        <div className="lg:mb-0 mb-4">
          <ul className=" text-sm flex items-center space-x-2  md:space-x-10 lg:space-x-14 lg:text-lg font-bold md:text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/marketplace">Marketplace</Link>
            </li>
            <li>
              <Link href="/team">Roadmap</Link>
            </li>
          </ul>
        </div>
        <div>
          <button
            className="text-lg px-4 py-1 rounded-lg border-2 border-black font-bold hover:bg-purple-600"
            onClick={connectWallet}
          >
            {account
              ? `${account.substring(0, 7)}...${account.substring(38)} `
              : "Connect Wallet"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
