"use client";

import React, { type ReactNode, useRef } from "react";
import { config, projectId } from "@/config";

import { createWeb3Modal } from "@web3modal/wagmi/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { cookieToInitialState, WagmiProvider } from "wagmi";

// Setup queryClient
const queryClient = new QueryClient();

// Create modal only if projectId is available
if (projectId) {
  createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
  });
}

export default function Web3ModalProvider({
  children,
  cookie,
}: {
  children: ReactNode;
  cookie?: string;
}) {
  const initialState = cookieToInitialState(config, cookie);
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
