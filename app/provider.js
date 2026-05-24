"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { UserDetailContext } from "./_context/UserDetailContext";

function Provider({ children }) {
  console.log(
    "PAYPAL ID:",
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  );

  const { user, isLoaded } = useUser();

  // 사용자 정보 저장
  const [userDetail, setUserDetail] = useState([]);

  useEffect(() => {
    if (!isLoaded || !user) return;

    VerifyUser();
  }, [isLoaded, user]);

  const VerifyUser = async () => {
    const email =
      user?.primaryEmailAddress?.emailAddress ||
      user?.emailAddresses?.[0]?.emailAddress;

    const imageUrl =
      user?.imageUrl ||
      user?.profileImageUrl ||
      user?.externalAccounts?.[0]?.imageUrl ||
      user?.externalAccounts?.[0]?.picture ||
      "https://www.gravatar.com/avatar/?d=identicon";

    const dataResult = await axios.post("/api/verify-user", {
      user: {
        fullName: user.fullName,
        email,
        imageUrl,
      },
    });

    console.log(dataResult.data);

    // DB에서 받아온 사용자 정보 저장
    setUserDetail(dataResult.data.result);
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        }}
      >
        <div>{children}</div>
      </PayPalScriptProvider>
    </UserDetailContext.Provider>
  );
}

export default Provider;