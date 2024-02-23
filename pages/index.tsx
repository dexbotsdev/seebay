import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useMangoStore, { serumProgramId } from '../stores/useMangoStore'
import {
  getMarketByBaseSymbolAndKind,
  getMarketIndexBySymbol,
} from '@blockworks-foundation/mango-client'
import TopBar from '../components/TopBar'
import TradePageGrid from '../components/TradePageGrid'
import useLocalStorageState from '../hooks/useLocalStorageState'
import AlphaModal, { ALPHA_MODAL_KEY } from '../components/AlphaModal'
import { PageBodyWrapper } from '../components/styles'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import IntroTips, { SHOW_TOUR_KEY } from '../components/IntroTips'
import { useViewport } from '../hooks/useViewport'
import { breakpoints } from '../components/TradePageGrid'
import type { ExpandableConfig, TableRowSelection } from 'antd/es/table/interface';

import FavoritesShortcutBar from '../components/FavoritesShortcutBar'
import { useWallet } from '@solana/wallet-adapter-react'
import PageBodyContainer from 'components/PageBodyContainer'
import Button from 'components/Button'
import { Card,Table, TableProps } from 'antd';
import { Label } from '../components/Input';
import AccountsModal from 'components/AccountsModal'
import CloggerCountsModal from 'components/CloggerCountsModal'
import { size } from 'lodash'
import { Keypair } from '@solana/web3.js'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'tv-chart',
        'alerts',
      ])),
      // Will be passed to the page component as props
    },
  }
}

const Index: React.FC = () => { 
  const { connected ,wallet,publicKey} = useWallet() 
  const [showAccountsModal, setShowAccountsModal] = useState(false)

  const [accounts,setAccounts]=useState([]);
  const defaultTitle = () => '';
  const defaultFooter = () => '';
  const [bottom, setBottom] = useState<TablePaginationPosition>('bottomRight');


  const handleCloseAccounts = useCallback(() => {
    setShowAccountsModal(false)
  }, [])

  const generateWallets = useCallback((count:number) => {
    const newWallets :any = []; 
    for (let i = 0; i < count; i++) {
      const keypair = Keypair.generate();
      newWallets.push({
        publicKey: keypair.publicKey.toBase58(),
        privateKey: keypair.secretKey,
        balance:0
      });
    } 
    setAccounts(newWallets); 
  }, [accounts])

  const columns = [
    {
      title: 'Address',
      dataIndex: 'publicKey',
      key: 'publicKey',
    },
    {
      title: 'Balance (SOL)',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <Button>Sell</Button>,
    },
  ];
  type TablePaginationPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight';
  interface DataType {
    key: number;
    name: string;
    age: number;
    address: string;
    description: string;
  }
  const tableProps: TableProps<DataType> = {
    bordered:true,
    loading:false,
    size:'small',
    expandable:undefined,
    title: defaultTitle,
    showHeader:true,
    footer: defaultFooter, 
    tableLayout:'fixed',
  };
  
  return (
    <>
      <div className={`bg-th-bkg-1 text-th-fgd-1 transition-all`}>
        <TopBar />
        <PageBodyContainer>
          <div className="py-4 md:pb-4 md:pt-10">
            <h1 className={`mb-1`}>Clogger Wallets</h1>
            <div className="flex flex-col items-start sm:flex-row">
              <p className="mb-0 mr-2">Generate and Manage Clogger Wallets</p>
            </div>
          </div>
          {connected && 
             <Card title="Wallets" size="small"  style={{width:'100%'}}  extra={ 
              <>
              <Button  onClick={() => setShowAccountsModal(true)}>Generate</Button> &nbsp; &nbsp; &nbsp;
              <Button>Random Deposit</Button> &nbsp; &nbsp; &nbsp;
              <Button>Reset</Button> &nbsp; &nbsp; &nbsp;
              </>
             }> 

             {accounts && accounts.length>0 ? 
             <> 
             <Table
              {...tableProps}
              pagination={{ position: [bottom] }}
              columns={columns}
              dataSource={accounts}
             />
             </>:
             <>
             </>}
            </Card> }
        </PageBodyContainer>
      </div>
      {showAccountsModal ? (
        <CloggerCountsModal
          onClose={handleCloseAccounts}
          isOpen={showAccountsModal}
          generate={generateWallets}
        />
      ) : null}
    </>
  )
}

export default Index
