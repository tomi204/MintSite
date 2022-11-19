import { ethers } from "ethers";
import React from "react";
import { useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
export const Mint = () => {
  const [number, setNumber] = useState(1);
  const number1 = ethers?.BigNumber.from(number);
  const onChangeValue = (e) => {
    setNumber((number) => parseInt(e.target.value));
  };

  const { isConnected } = useAccount();
  //const number = ethers.BigNumber.from(1);
  const { config } = usePrepareContractWrite({
    address: "0xC1C84F632a93cc4487bB2fbB6921DB47062f17c1",
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
    args: [number1],
  });
  const { write } = useContractWrite(config);

  return (
    <div>
      {isConnected && (
        <div>
          <button
            style={{
              backgroundColor: "#0d76fc",
              color: "white",
              paddingInline: "35px",
              paddingBlock: "10px",
              cursor: "pointer",
              borderRadius: "20px",
              border: "none",
              fontSize: "15px",
            }}
            disabled={!write}
            onClick={() => write?.()}
          >
            MINT
          </button>
          <input type="number" value={number} onChange={onChangeValue} />
        </div>
      )}
    </div>
  );
};
