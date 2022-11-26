import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { Mint } from "../components/mint/Mint";
import styles from "../styles/Home.module.css";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { MetaData } from "../components/metadata/Metadata";
import { useAccount } from "wagmi";
import { useMounted } from "./../components/context/Mounted";
const Home: NextPage = () => {
  const mounted = useMounted();
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
      {mounted
        ? isConnected && (
            <main className={styles.main}>
              <h2 className={styles.title}>Mint your NFT</h2>

              <Mint />
              <div className={styles.divM}>
                <MetaData />
                <br />
                <a
                  href="https://polygonscan.com/address/0xc1c84f632a93cc4487bb2fbb6921db47062f17c1"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  View in Polygonscan
                </a>
              </div>
            </main>
          )
        : null}

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
