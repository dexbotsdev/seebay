import React, { FunctionComponent, useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { PlusCircleIcon, UsersIcon } from '@heroicons/react/outline' 
import { abbreviateAddress, formatUsdValue } from '../utils'
import useLocalStorageState from '../hooks/useLocalStorageState'
import Modal from './Modal'
import { ElementTitle } from './styles'
import Button, { LinkButton } from './Button' 
import { useTranslation } from 'next-i18next'
import Tooltip from './Tooltip'
import { useWallet } from '@solana/wallet-adapter-react'
import { InputNumber } from 'antd';

export const LAST_ACCOUNT_KEY = 'lastCloggerViewed-3.0'

interface CloggerCountsModalProps {
  onClose: () => void
  isOpen: boolean
  generate: (count:number | null) => void

}

const CloggerCountsModal: FunctionComponent<CloggerCountsModalProps> = ({
  isOpen,
  onClose,
  generate
}) => {
  
  const [newCount, setNewcount] = useState<number|null>(4) 

  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
 
          <>
            <Modal.Header>
              <ElementTitle noMarginBottom>Generate Clogger Wallets</ElementTitle>
            </Modal.Header>
            <div className="pb-3 text-th-fgd-1">
              <div className="font-semibold pb-5 ">
                Enter the Number of Wallets you want to Generate
              </div>
              <InputNumber   style={{ width: '100%' }} defaultValue={4} value={newCount} onChange={(value)=>setNewcount(value)}/> 
            </div>
            <Button onClick={()=>generate(newCount)}>Generate</Button> &nbsp; &nbsp; &nbsp;
          </>
        
    </Modal>
  )
}
 

export default React.memo(CloggerCountsModal)
