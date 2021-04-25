
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Web3Context } from 'utils/web3Context';

export default function Home() {
  const { onboard } = useContext(Web3Context);

  return (
    <div>
      <Head>
        <title>Next Web3 Boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
        </nav>
      </header>

      <main>
        <button onClick={async () => {
          await onboard?.walletSelect();
          await await onboard.walletCheck();
        }}>
          Connect
        </button>
      </main>
    </div>
  );
}
