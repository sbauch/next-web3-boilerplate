import 'dotenv/config';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';

import { HardhatUserConfig } from 'hardhat/types';

import { accounts, node_url } from './utils/network';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.6.6',
  },
  networks: {
    mainnet: {
      url: node_url('mainnet'),
      accounts: accounts('mainnet'),
      gas: 'auto',
    },
    kovan: {
      url: node_url('kovan'),
      accounts: accounts('kovan'),
      gas: 'auto',
    },
    rinkeby: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby'),
      gas: 'auto',
    },
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
};

export default config;
