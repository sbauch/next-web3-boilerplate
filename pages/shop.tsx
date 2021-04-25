import data from 'collection';
import Asset from 'components/Asset';
import React, { ReactElement } from 'react';

const Shop = (): ReactElement => {
  const {
    collection: { items },
  } = data;
  return (
    <>
      <h1>buy these nfts</h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {items.map((item) => (
          <Asset
            key={item.tokenId}
            tokenAddress={item.tokenAddress}
            tokenId={item.tokenId}
          />
        ))}
      </div>
    </>
  );
};

export default Shop;
