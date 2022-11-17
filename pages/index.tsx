import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { Mint } from "../components/mint/Mint";
import styles from "../styles/Home.module.css";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { MetaData } from "../components/mint/Metadata";
import { useAccount } from "wagmi";
const Home: NextPage = () => {
  const { isConnected, isDisconnected } = useAccount();
  return (
    <div className={styles.container}>
      <Head>
        <title>Mint site Tomi204</title>
      </Head>
      <div className={styles.navbar}>
        <ConnectButton />
      </div>
      {isDisconnected && (
        <main className={styles.main}>
          <h1 className={styles.title}>Connect your wallet for mint</h1>
        </main>
      )}
      {isConnected && (
        <main className={styles.main}>
          <h1 className={styles.title}>Mint your NFT</h1>

          <Mint />
          <div className={styles.divM}>
            <MetaData />
            <a href="https://polygonscan.com/address/0xc1c84f632a93cc4487bb2fbb6921db47062f17c1">
              View in Polygonscan
            </a>
          </div>
        </main>
      )}

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/tomiioliver"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with ❤️ by Tomi204
        </a>
      </footer>
    </div>
  );
};

export default Home;
