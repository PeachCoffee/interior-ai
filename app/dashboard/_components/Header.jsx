"use client";

import React, { useContext } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { UserDetailContext } from "../../_context/UserDetailContext";

function Header() {
  const { userDetail } = useContext(UserDetailContext);

  const { user } = useUser();
  const router = useRouter();

  const handleCreditsClick = () => {
    if (!user) {
      router.push("/sign-in");
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">

        <Link
          href="/"
          className="btn btn-ghost text-xl"
        >
          Interior AI
        </Link>

      </div>

      <div className="flex-none gap-2">

        <Link
          href="/dashboard/buy-credits"
          className="btn btn-ghost"
        >
          Buy More Credits
        </Link>

        <button
          className="btn"
          onClick={handleCreditsClick}
        >
          <div className="badge badge-secondary">
            {userDetail?.credits}
          </div>

          Credits left
        </button>

        <UserButton />

      </div>
    </div>
  );
}

export default Header;