import 'dotenv/config';

import {
  MnemonicWalletSubprovider,
  Web3ProviderEngine,
} from '@0x/subproviders';
import { ethers, run } from 'hardhat';
import opensea, { Network, OpenSeaPort } from 'opensea-js';
import { WyvernSchemaName } from 'opensea-js/lib/types';

const NETWORK = process.env.NETWORK;
const BASE_DERIVATION_PATH = `44'/60'/0'/0`;

const main = async () => {
  const mnemonicWalletSubprovider = new MnemonicWalletSubprovider({
    mnemonic: process.env.MNEMONIC,
    // baseDerivationPath: BASE_DERIVATION_PATH,
  });

  const providerEngine = new Web3ProviderEngine();
  providerEngine.addProvider(mnemonicWalletSubprovider);
  providerEngine.start();

  const accounts = await mnemonicWalletSubprovider.getAccountsAsync();

  console.log(
    'Accounts:',
    accounts.map((a) => a),
  );

  const seaport = new OpenSeaPort(
    providerEngine,
    {
      networkName: Network.Rinkeby,
      // apiKey: API_KEY,
    },
    (arg) => console.log(arg),
  );

  console.log('Auctioning an item for a fixed price...');
  return seaport
    .createSellOrder({
      asset: {
        tokenId:
          '255213205822460860536172521482270762282825729643322071141453463207966413704',
        tokenAddress: '0xee45b41d1ac24e9a620169994deb22739f64f231',
        schemaName: WyvernSchemaName.ERC1155, // Also not work without schemaName
      },
      startAmount: 0.04,
      expirationTime: 0,
      accountAddress: accounts[0],
    })
    .then((fixedPriceSellOrder) => {
      console.log(
        `Successfully created a fixed-price sell order! ${fixedPriceSellOrder}\n`,
      );

      return fixedPriceSellOrder;
    })
    .catch((e) => {
      console.log('WHAT THE FUCK', e);
      return e;
    });
};

main()
  .then((result) => {
    console.log('HELLO', result);
    process.exit(0);
  })
  .catch((error) => {
    console.log('ERROR', error);
    process.exit(1);
  });
