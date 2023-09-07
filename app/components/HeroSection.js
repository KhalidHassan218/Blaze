import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import banner from "../utils/assets/monkey.png";
import { AppContext } from "@/app/utils/assets/GlobalContext/AppProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeroSection = () => {
  const { monkeyNFT, account } = useContext(AppContext);
  const [isListed, setIsListed] = useState();
  const [reload, setReload] = useState(false);

  const getWhiteList = async () => {
    if (monkeyNFT) {
      try {
        const tx = await monkeyNFT.getWhiteList();
        toast.warn("Please wait...");
        await tx.wait();
        setReload(!reload);
        toast.success("You are added");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Not Connected!!");
    }
  };

  useEffect(() => {
    const checkWhiteList = async () => {
      if (monkeyNFT) {
        try {
          const value = await monkeyNFT.whiteListAddress(account);
          setIsListed(value);
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.warn("Not Connected!");
      }
    };

    account && checkWhiteList();
  }, [monkeyNFT, account, reload]);
  return (
    <div className=" w-[90%] mx-auto md:py-[80px] py-2 items-center">
      <div className="mb-10">
        <h2 className="text-4xl font-bold">ROAR- Mint Your Own NFTs</h2>
        <h3 className="text-2xl fond-bold mt-4">
          Create, Sell, Own Unique Digital Assets
        </h3>
        <button
          onClick={getWhiteList}
          className="text-lg px-6 py-2 bg-purple-700 rounded-xl text-white mt-5 hover:bg-purple-500"
        >
          {isListed ? "You are WhiteListed" : "Get WhiteList"}
        </button>
      </div>
      <div>
        <Image className="rounded-lg" src={banner} alt="banner image" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default HeroSection;
