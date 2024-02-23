import React, {
  useEffect,
  useState,
} from 'react'
import { ZERO_BN } from '@blockworks-foundation/mango-client'
import useMangoStore, {  } from 'stores/useMangoStore'
import PageBodyContainer from 'components/PageBodyContainer'
import TopBar from 'components/TopBar'
import { useViewport } from 'hooks/useViewport'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useWallet } from '@solana/wallet-adapter-react'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'close-account',
        'delegate',
        'alerts',
      ])),
      // Will be passed to the page component as props
    },
  }
}

const TABS = ['Portfolio', 'Orders', 'History', 'Interest', 'Funding']

export default function Account() {
  const { t } = useTranslation(['common', 'close-account', 'delegate'])
  const { width } = useViewport()
  const router = useRouter()
  const { wallet } = useWallet()
  const setMangoStore = useMangoStore((s) => s.set)
  const [showAccountsModal, setShowAccountsModal] = useState(false)
  const [showNameModal, setShowNameModal] = useState(false)
  const [showCloseAccountModal, setShowCloseAccountModal] = useState(false)
  const [showAlertsModal, setShowAlertsModal] = useState(false)
  const [showDelegateModal, setShowDelegateModal] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [resetOnLeave, setResetOnLeave] = useState(false)
  const [mngoAccrued, setMngoAccrued] = useState(ZERO_BN)
  const [viewIndex, setViewIndex] = useState(0)
  const [activeTab, setActiveTab] = useState(TABS[0])

  const connecting = wallet?.adapter?.connecting
 
 
  useEffect(() => {
    const handleRouteChange = () => {
      if (resetOnLeave) {
        setMangoStore((state) => {
          state.selectedMangoAccount.current = null
        })
      }
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [resetOnLeave])

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isCopied])



  useEffect(() => {
    if (connecting) {
      router.push('/account')
    }
  }, [connecting, router])



  return (
    <div className={`bg-th-bkg-1 text-th-fgd-1 transition-all`}>
      <TopBar />
      <PageBodyContainer>
        <div className="flex flex-col pt-4 pb-6 md:flex-row md:items-end md:justify-between md:pb-4 md:pt-10">
          
        </div>
        <div className="md:rounded-lg md:bg-th-bkg-2 md:p-6">
          
        </div>
      
      </PageBodyContainer>
     
    </div>
  )
}
