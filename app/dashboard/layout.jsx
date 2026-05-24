"use client";

import React from "react";
import Header from "./_components/Header";
import Provider from "../_context/UserDetailContext";

function DashboardLayout({ children }) {
  return (
    <Provider>
      <Header />
      <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {children}
      </main>
    </Provider>
  );
}

export default DashboardLayout;