import data from 'collection';
import Asset from 'components/Asset';
import { WyvernSchemaName } from 'opensea-js/lib/types';
import React, { ReactElement, useContext, useEffect } from 'react';
import { Web3Context } from 'utils/web3Context';
const Collection = (): ReactElement => {
  const {
    collection: {
      id,
      items: [asset, ..._rest],
    },
  } = data;
  const { address, seaport } = useContext(Web3Context);
  // const asset = {
  //   tokenAddress: '0xee45b41d1ac24e9a620169994deb22739f64f231',
  //   tokenId:
  //     '255213205822460860536172521482270762282825729643322071141453463207966413704',
  //   schemaName: WyvernSchemaName.ERC1155,
  // };

  useEffect(() => {
    if (!seaport || !address) return;
    const getTokens = async () => {
      const balance = await seaport.getAssetBalance({
        accountAddress: address,
        asset,
      });
      console.warn(balance.toNumber());
    };

    getTokens();
  }, [seaport, address]);

  return (
    <>
      <h1>you own these nfts</h1>

      <Asset
        tokenAddress="0xee45b41d1ac24e9a620169994deb22739f64f231"
        tokenId="255213205822460860536172521482270762282825729643322071141453463207966413704"
      />
    </>
  );
};

export default Collection;
