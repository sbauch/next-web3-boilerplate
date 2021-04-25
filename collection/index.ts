import { WyvernSchemaName } from 'opensea-js/lib/types';

const contractAddress = '0xee45b41d1ac24e9a620169994deb22739f64f231';

const data = {
  collection: {
    id: contractAddress,
    items: [
      {
        maxSupply: 5_000,
        name: 'buy this nft - open edition',
        imageUrl:
          'https://lh3.googleusercontent.com/Euvtm-R-a7pCttIpA60dHYOya17V-aFx4FhQq9BiX9qryAt2HDtFZhwR7ECi0cFicQ0_CPjmDZhDtXIz_Q4F3rM7woqUYRTaM50lqg=s250',
        schemaName: WyvernSchemaName.ERC1155,
        tokenAddress: contractAddress,
        tokenId:
          '255213205822460860536172521482270762282825729643322071141453463207966413704',
      },
      {
        maxSupply: 1,
        name: 'buy this nft - 1 / 1',
        imageUrl:
          'https://lh3.googleusercontent.com/Euvtm-R-a7pCttIpA60dHYOya17V-aFx4FhQq9BiX9qryAt2HDtFZhwR7ECi0cFicQ0_CPjmDZhDtXIz_Q4F3rM7woqUYRTaM50lqg=s250',
        schemaName: WyvernSchemaName.ERC1155,
        tokenAddress: contractAddress,
        tokenId:
          '255213205822460860536172521482270762282825729643322071141453464307478036481',
      },
      {
        maxSupply: 11,
        name: 'buy this nft - 11 / 11',
        imageUrl:
          'https://lh3.googleusercontent.com/Euvtm-R-a7pCttIpA60dHYOya17V-aFx4FhQq9BiX9qryAt2HDtFZhwR7ECi0cFicQ0_CPjmDZhDtXIz_Q4F3rM7woqUYRTaM50lqg=s250',
        schemaName: WyvernSchemaName.ERC1155,
        tokenAddress: contractAddress,
        tokenId:
          '255213205822460860536172521482270762282825729643322071141453466506501292033',
      },
    ],
  },
};

export default data;
