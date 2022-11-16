import { ethers } from "ethers";
import React from "react";

import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
export const Mint = () => {
  const { isConnected } = useAccount();
  const number = ethers.BigNumber.from(1);
  const { config } = usePrepareContractWrite({
    address: "0xb7004ED1F06282995Ae210B5C00D8D75733FC095",
    functionName: "mintNFT",
    overrides: {
      value: ethers.utils.parseEther("0.05"),
    },
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "quantity",
            type: "uint256",
          },
        ],
        name: "mintNFT",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    args: [number],
  });
  const { write } = useContractWrite(config);

  return (
    <div>
      {isConnected && (
        <button
          style={{
            backgroundColor: "blue",
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
