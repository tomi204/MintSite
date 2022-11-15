import { ethers } from "ethers";
import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
export const Mint = () => {
  const { isConnected } = useAccount();

  const { config } = usePrepareContractWrite({
    address: "0xca985e7b84ca864190f8b0f52becec38a962d61e",
    functionName: "mintNFT",
    overrides: {
      value: ethers.utils.parseEther("0.09"),
    },
    abi: [
      {
        inputs: [],
        name: "mintNFT",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
  });
  const { write } = useContractWrite(config);

  return (
    <div>
      {isConnected && (
        <button
          style={{ borderRadius: "20px" }}
          disabled={!write}
          onClick={() => write?.()}
        >
          MINT
        </button>
      )}
    </div>
  );
};
