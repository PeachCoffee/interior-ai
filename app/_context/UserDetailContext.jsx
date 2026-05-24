"use client";

import React, { createContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

export const UserDetailContext = createContext();

export default function Provider({ children }) {
  const { user, isLoaded } = useUser();
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const run = async () => {
      const res = await axios.post("/api/verify-user", {
        user: {
          fullName: user.fullName,
          email:
            user?.primaryEmailAddress?.emailAddress ||
            user?.emailAddresses?.[0]?.emailAddress,
          imageUrl: user?.imageUrl,
        },
      });

      setUserDetail(res.data.result);
    };

    run();
  }, [isLoaded, user]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}