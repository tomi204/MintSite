import { ethers } from "ethers";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { data } from "axios";
export const MetaData = () => {
  const { isConnected, address } = useAccount();
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const key =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const poly = "https://matic-mainnet.chainstacklabs.com";
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
  ];

  const contract = new ethers.Contract(
    "0xb7004ED1F06282995Ae210B5C00D8D75733FC095",
    abi,
    wallet
  );

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
      console.log(meta);
    });
  });

  return (
    <div>
      {isConnected && (
        <button
          style={{
            backgroundColor: "#0d76fc",
            color: "white",
            paddingInline: "35px",
            paddingBlock: "10px",
            cursor: "pointer",
            borderRadius: "20px",
            border: "none",
          }}
          disabled={!write}
          onClick={() => write?.()}
        >
          MINT
        </button>
      )}
    </div>
  );
};