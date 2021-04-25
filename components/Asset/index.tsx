import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Web3Context, useAsset, useOrders } from "utils/web3Context";

const Asset = ({ tokenAddress, tokenId}): ReactElement => {
  const { address, seaport, orders } = useContext(Web3Context);
  const { asset } = useAsset(
    tokenAddress,
    tokenId,
  )

  const buy = async () => {
    if (!orders.length) return;
    seaport.fulfillOrder({order:orders[0], accountAddress: address});
  }

  return(
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 24}}>
      <h2>{asset?.name}</h2>
      <p>{asset?.description}</p>
      <img src={asset?.imageUrl} />
      <button disabled={!orders.length} onClick={buy}>Buy</button>
    </div>
  )
}

export default Asset;