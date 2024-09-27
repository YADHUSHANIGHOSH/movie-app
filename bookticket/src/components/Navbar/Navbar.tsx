import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { BiSearch } from "react-icons/bi";
import Style from './navbar.module.css'
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";




const Navbar = () => {
  const {userId} =auth();
  return (
    <nav className={Style.nav}>
      <div className={Style.left}>
        <Link href="/">
        <Image src={logo} alt="Logo" width={100} height={50} /></Link>
        
        <div className={Style.searchBox}>
      <BiSearch className={Style.searchBtn} />
      <input type="text" placeholder="Search for a Movie" className={Style.searchInput} />
    </div>
      </div>
      <div className={Style.right}>
        {userId ? (<div>
          <UserButton />
        </div>)
        :(<div>
          <Link href="/sign-up" className={Style.signup_button}>
          SignUp
          </Link>
          <Link href="/sign-in" className={Style.signin_button}>
            Sign in
          </Link>
          <Link rel="stylesheet" href="/" className={Style.linkstylenone}>
          </Link></div>)}
      </div>
    </nav>
  );
};

export default Navbar;


