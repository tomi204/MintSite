import { ethers } from "ethers";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import Image from "next/image";
export const MetaData = () => {
  const { isConnected, address } = useAccount();
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    generateNft();
  }, [setNfts]);
  const key =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // default key
  const poly = "https://matic-mainnet.chainstacklabs.com"; // polygon rpc
  async function generateNft() {
    const provider = new ethers.providers.JsonRpcProvider(poly); //provider for polygon
    const wallet = new ethers.Wallet(key, provider); // wallet for polygon

    const abi = [
      // abi for contract
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
      "0xC1C84F632a93cc4487bB2fbB6921DB47062f17c1", //contract address
      abi,
      wallet
    );
    const itemArray = []; // clear array
    const token = 0; // token id for show in front end
    const owner = contract.ownerOf(token); // get owner of token
    const rawUri = contract.tokenURI(token); // get token uri(image)
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
            <h2 style={{ color: "white" }}>Error</h2>
          </div>;
        })}
      </div>
    );
  return (
    <div>
      {nfts.map((nft, i) => {
        return (
          <div
            className="nft-div"
            isHoverable
            key={i}
            variant="bordered"
            style={
              ({ display: "flex" },
              { alignItems: "center" },
              { justifyContent: "center" })
            }
          >
            <h2>{nft.name}</h2>
            <Image
              style={{ borderRadius: 20 }}
              width={230}
              height={280}
              src={nft.img}
            />
            <h3>NFT ID: {nft.tokenId}</h3>
          </div>
        );
      })}
    </div>
  );
};
