import Notify from 'bnc-notify';
import Onboard from 'bnc-onboard';

const networkId = 4;
const rpcUrl = 'https://rinkeby.infura.io/v3/6ed57d048a7345d4a49aa2e6f4c83db3';
const apiUrl = process.env.REACT_APP_API_URL;
const dappId = '5c501569-1ad1-490d-a7d0-d8a0aba75dad';

export function initOnboard(subscriptions) {
  return Onboard({
    dappId,
    hideBranding: true,
    networkId,
    apiUrl,
    darkMode: true,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask' },
        {
          walletName: 'trezor',
          appUrl: 'https://reactdemo.blocknative.com',
          email: 'aaron@blocknative.com',
          rpcUrl,
        },
        {
          walletName: 'ledger',
          rpcUrl,
        },
        {
          walletName: 'walletConnect',
          infuraKey: 'cea9deb6467748b0b81b920b005c10c1',
        },
        { walletName: 'cobovault', appName: 'React Demo', rpcUrl },
        {
          walletName: 'lattice',
          appName: 'Onboard Demo',
          rpcUrl,
        },
        { walletName: 'coinbase' },
        { walletName: 'status' },
        { walletName: 'walletLink', rpcUrl },
        {
          walletName: 'portis',
          apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b',
        },
        { walletName: 'fortmatic', apiKey: 'pk_test_886ADCAB855632AA' },
        { walletName: 'torus' },
        { walletName: 'trust', rpcUrl },
        { walletName: 'opera' },
        { walletName: 'operaTouch' },
        { walletName: 'imToken', rpcUrl },
        { walletName: 'meetone' },
        { walletName: 'mykey', rpcUrl },
        { walletName: 'wallet.io', rpcUrl },
        { walletName: 'huobiwallet', rpcUrl },
        { walletName: 'hyperpay' },
        { walletName: 'atoken' },
        { walletName: 'liquality' },
        { walletName: 'frame' },
        { walletName: 'tokenpocket', rpcUrl },
        { walletName: 'authereum', disableNotifications: true },
        { walletName: 'ownbit' },
      ],
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
      { checkName: 'network' },
      { checkName: 'balance', minimumBalance: '100000' },
    ],
  });
}

export function initNotify() {
  return Notify({
    dappId,
    networkId,
    apiUrl,
  });
}
