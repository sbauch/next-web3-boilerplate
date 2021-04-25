import type { AppProps } from 'next/app';
import React from 'react';
import Web3ContextProvider from 'utils/web3Context';

export default function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ContextProvider>
      <Component {...pageProps} />
    </Web3ContextProvider>
  );
}
