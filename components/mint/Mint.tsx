import { BigNumber, ethers } from "ethers";
import React from "react";
import { useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
export const Mint = () => {
  const [number, setNumber] = useState("0");
  const onChangeValue = (e) => {
    if (e.target.value === "") {
      setNumber("0");
    } else {
      setNumber(e.target.value);
    }
  };

  const { isConnected, address } = useAccount();
  const { config } = usePrepareContractWrite({
    address: "0xC1C84F632a93cc4487bB2fbB6921DB47062f17c1",
    functionName: "mintNFT",
    overrides: {
      from: address,
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
    args: [ethers.BigNumber.from(number)],
  });
  const { write } = useContractWrite(config);

  return (
    <div>
      {isConnected && (
        <div>
          <button
            className="buton-mint"
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
          <input
            type="string"
            placeholder="Enter the number of NFTs to mint"
            min={0}
            style={{
              marginLeft: "10px",
              backgroundColor: "#0d76fc",
              color: "white",
              paddingInline: "9px",
              paddingBlock: "10px",
              cursor: "pointer",
              borderRadius: "20px",
              border: "none",
              fontSize: "15px",
            }}
            value={number}
            onChange={onChangeValue}
          />
        </div>
      )}
    </div>
  );
};
