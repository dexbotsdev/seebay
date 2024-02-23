import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import 'intro.js/introjs.css'
import '../styles/index.css'
import 'react-nice-dates/build/style.css'
import '../styles/datepicker.css'
import useHydrateStore from '../hooks/useHydrateStore'
import Notifications from '../components/Notification'
import { useRouter } from 'next/router'
import { ViewportProvider } from '../hooks/useViewport'
import BottomBar from '../components/mobile/BottomBar'
import { appWithTranslation } from 'next-i18next'
import ErrorBoundary from '../components/ErrorBoundary'
import GlobalNotification from '../components/GlobalNotification'
import { useMemo } from 'react'

import { WalletProvider, WalletListener } from 'components/WalletAdapter'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare' 

 
 

const PageTitle = () => {
  const router = useRouter()  
   

  return (
    <Head>
      <title> </title>
    </Head>
  )
}

function App({ Component, pageProps }) {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter() 
    ],
    []
  )

  return (
    <>
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content=", Serum, SRM, Serum DEX, DEFI, Decentralized Finance, Decentralised Finance, Crypto, ERC20, Ethereum, Decentralize, Solana, SOL, SPL, Cross-Chain, Trading, Fastest, Fast, SerumBTC, SerumUSD, SRM Tokens, SPL Tokens"
        />
        <meta
          name="description"
          content=" - "
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/apple-touch-icon.png"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="" />
        <meta
          name="twitter:description"
          content=" - Decentralised, cross-margin trading up to 20x leverage with lightning speed and near-zero fees."
        />
        <meta
          name="twitter:image"
          content="https://www.mango.markets/socials/twitter-image-1200x600.png?34567878"
        />
        <meta name="google" content="notranslate" />
        <link rel="manifest" href="/manifest.json"></link>
      </Head>
      <ErrorBoundary>
        <WalletProvider wallets={wallets} autoConnect>
          <PageTitle />
          
          <ThemeProvider defaultTheme="Mango">
            <WalletListener />
            <ViewportProvider>
              <div className="min-h-screen bg-th-bkg-1">
                <ErrorBoundary>
                   <Component {...pageProps} />
                </ErrorBoundary>
              </div>
              <div className="fixed bottom-0 left-0 z-20 w-full md:hidden">
                <BottomBar />
              </div> 
              <Notifications />
            </ViewportProvider>
          </ThemeProvider>
        </WalletProvider>
      </ErrorBoundary>
    </>
  )
}

export default appWithTranslation(App)
