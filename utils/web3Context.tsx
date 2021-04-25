import data from 'collection';
import { Network, OpenSeaPort } from 'opensea-js';
import { EventType, OpenSeaAsset, OrderSide } from 'opensea-js/lib/types';
import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { initNotify, initOnboard } from './connect';
const defaultValue = {
  onboard: undefined,
  address: undefined,
  provider: undefined,
  seaport: undefined,
  notify: undefined,
  network: undefined,
  balance: undefined,
  orders: undefined,
};

const Web3Context = createContext(defaultValue);

const Web3ContextProvider = ({ children }: any): ReactElement => {
  const [provider, setProvider] = useState(null);
  const [seaport, setSeaport] = useState<OpenSeaPort>(null);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);
  const [onboard, setOnboard] = useState(null);
  const [notify, setNotify] = useState(null);
  const [wallet, setWallet] = useState({});
  const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(false);

  const {
    collection: { id, items },
  } = data;

  useEffect(() => {
    const onboard = initOnboard({
      address: setAddress,
      network: setNetwork,
      balance: setBalance,
      wallet: (wallet) => {
        if (wallet.provider) {
          setWallet(wallet);
          setProvider(wallet.provider);
          window.localStorage.setItem('selectedWallet', wallet.name);
        } else {
          setProvider(null);
          setWallet({});
        }
      },
    });

    setOnboard(onboard);
    setNotify(initNotify());
  }, []);

  useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem(
      'selectedWallet',
    );

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
    }
  }, [onboard]);

  useEffect(() => {
    if (!provider) return;
    const _seaport = new OpenSeaPort(provider, {
      networkName: Network.Rinkeby,
    });
    setSeaport(_seaport);
  }, [provider]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!seaport) return;
      const { orders } = await seaport.api.getOrders({
        asset_contract_address: id,
        token_ids: items.map((item) => item.tokenId),
        side: OrderSide.Sell,
      });
      setOrders(orders);
    };
    setTimeout(() => {
      fetchOrders();
    }, 3_000);
  }, [seaport]);

  useEffect(() => {
    if (!seaport || !notify) return;
    seaport.addListener(EventType.TransactionCreated, ({ transactionHash }) => {
      notify.hash(transactionHash);
    });

    return () => {
      seaport.removeAllListeners();
    };
  }, [seaport]);

  const value = {
    onboard,
    address,
    wallet,
    provider,
    seaport,
    notify,
    network,
    balance,
    orders,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

const useAsset = (
  tokenAddress: string,
  tokenId: string,
): {
  asset?: OpenSeaAsset;
  loading: boolean;
} => {
  const { seaport } = useContext(Web3Context);
  const [asset, setAsset] = useState<OpenSeaAsset>();
  const [loading, setLoading] = useState(false);

  const fetchAsset = async () => {
    if (!seaport || loading) return;
    setLoading(true);

    const asset: OpenSeaAsset = await seaport.api.getAsset({
      tokenAddress: tokenAddress,
      tokenId,
    });
    setAsset(asset);
    setLoading(false);
  };

  useEffect(() => {
    fetchAsset();
  }, [seaport]);

  return {
    asset,
    loading,
  };
};

const useOrders = (
  tokenAddress: string,
  tokenId: string,
): {
  orders?: any[];
  loading: boolean;
} => {
  const { seaport } = useContext(Web3Context);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (_tokenAddress) => {
    if (!seaport || loading) return;
    setLoading(true);
    const { orders } = await seaport.api.getOrders({
      asset_contract_address: _tokenAddress,
      token_id: tokenId,
      side: OrderSide.Sell,
    });
    setOrders(orders);
  };

  const debounceFetchOrders = useDebouncedCallback(
    (tokenAddress) => fetchOrders(tokenAddress),
    Math.random() * 100,
  );
  debounceFetchOrders(tokenAddress);

  return {
    orders,
    loading,
  };
};

export default Web3ContextProvider;
export { Web3Context, useAsset, useOrders };
