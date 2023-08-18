import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/constants";
import AuthProviders from "./authPoviders";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "next-auth/react";
import ProfileMenu from "./profileMenu";

type Props = {};

export default async function Navbar({}: Props) {
  const session = await getCurrentUser();
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href={"/"}>
          <Image src={"/logo.svg"} width={115} height={43} alt="logo" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7 ">
          {NavLinks.map((lnk) => {
            return (
              <Link key={lnk.key} href={lnk.href}>
                {lnk.text}
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="flexCenter gap-4 ">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />

            <Link href={"/create-project"}> Share work </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
}
