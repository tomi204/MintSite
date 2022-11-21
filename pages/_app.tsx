import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";

import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygon],
  [
    alchemyProvider({
      apiKey: process.env.alchemyKey,
      stallTimeout: 1_000,
    }),

    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Mint Tomi204",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          showRecentTransactions={true}
          theme={darkTheme({
            accentColor: "#0d76fc",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
          chains={chains}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default MyApp;
