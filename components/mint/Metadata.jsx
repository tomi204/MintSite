import { ethers } from "ethers";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { data } from "axios";
import Image from "next/image";
export const MetaData = () => {
  const { isConnected, address } = useAccount();
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    generateNft();
  }, [setNfts]);
  const key =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const poly = "https://matic-mainnet.chainstacklabs.com";
  async function generateNft() {
    const provider = new ethers.providers.JsonRpcProvider(poly);
    const wallet = new ethers.Wallet(key, provider);
    async function refreshPage() {
      window.location.reload();
    }

    const abi = [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "tokenURI",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "ownerOf",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];

    const contract = new ethers.Contract(
      "0xC1C84F632a93cc4487bB2fbB6921DB47062f17c1",
      abi,
      wallet
    );
    const itemArray = [];
    const token = 0;
    const owner = contract.ownerOf(token);
    const rawUri = contract.tokenURI(token);
    const Uri = Promise.resolve(rawUri);
    const getUri = Uri.then((value) => {
      let str = value;
      let cleanUri = str.replace("ipfs://", "https://ipfs.io/ipfs/");
      let metadata = axios.get(cleanUri).catch(function (error) {
        console.log(error.toJSON());
      });
      return metadata;
    });
    getUri.then((value) => {
      let rawImg = value.data.image;
      var name = value.data.name;
      var desc = value.data.description;
      let image = rawImg.replace("ipfs://", "https://ipfs.io/ipfs/");
      Promise.resolve(owner).then((value) => {
        let ownerW = value;
        let meta = {
          name: name,
          img: image,
          tokenId: token,
          wallet: ownerW,
          desc,
        };
        itemArray.push(meta);
      });
    });
    await new Promise((r) => setTimeout(r, 5000));
    setNfts(itemArray);
    setLoadingState("loaded");
  }
  if (loadingState === "loaded" && !nfts.length)
    return (
      <div>
        {nfts.map((nft, i) => {
          <div>
            <Image src={nft.img} key={i} />
            <h2>No Collections Retrieved</h2>
          </div>;
        })}
      </div>
    );
  return (
    <div>
      <h1>NFT Collection</h1>
      <div gap={3}>
        {nfts.map((nft, i) => {
          return (
            <div isHoverable key={i} variant="bordered">
              <Image width={200} height={200} src={nft.img} />
              <h1>{nft.name}</h1>
              <h1>NFT ID: {nft.tokenId}</h1>
              <h1>{nft.desc}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};
