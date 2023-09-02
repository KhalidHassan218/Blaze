import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {FaTwitter ,FaTelegram} from "react-icons/fa";
const Footer = () => {
  return (
    <div className="py-5 bg-purple-400 text-center text-lg flex items-center flex-col md:flex-row space-x-8 justify-center">
      <p>© 2023 BosJaw -BLAZE. All rights reserved.</p>
      <div className="flex items-center space-x-1 justify-center">  

      
      <Link href="https://twitter.com" target="_blank">
        <FaTwitter className="text-[25px]" />
      </Link>
      <Link
        href="https://web.telegram.org/"
        target="_blank"
      >
        <FaTelegram className="text-[25px]" />
      </Link>
      </div>
    </div>
  );
};

export default Footer;
