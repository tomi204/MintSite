import { BigNumber, ethers } from "ethers";
import React from "react";
import styles from "./Mint.module.css";
import { useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
export const Mint = () => {
  const [number, setNumber] = useState("0");
  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setNumber("1");
    } else {
      setNumber(event.target.value);
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
            className={styles.btnMint}
            style={{
              backgroundColor: "#0d76fc",
            }}
            disabled={!write}
            onClick={() => write?.()}
          >
            MINT
          </button>
          <input
            className={styles.input}
            type="number"
            placeholder="Enter the number of NFTs to mint"
            min={0}
            value={number}
            onChange={onChangeValue}
          />
        </div>
      )}
    </div>
  );
};
