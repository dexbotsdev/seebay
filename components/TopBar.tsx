import MenuItem from './MenuItem'
import { ConnectWalletButton } from 'components'
import NavDropMenu from './NavDropMenu'
import { useTranslation } from 'next-i18next'
import Settings from './Settings'
import {
  CalculatorIcon,
  CurrencyDollarIcon,
  LibraryIcon,
  LightBulbIcon,
  UserAddIcon,
} from '@heroicons/react/outline'
import { MangoIcon } from './icons'
import { useWallet } from '@solana/wallet-adapter-react'

// const StyledNewLabel = ({ children, ...props }) => (
//   <div style={{ fontSize: '0.5rem', marginLeft: '1px' }} {...props}>
//     {children}
//   </div>
// )

const TopBar = () => {
  const { t } = useTranslation('common')
  const { publicKey } = useWallet() 
  

  return (
    <>
      <nav className={`bg-th-bkg-2`}>
        <div className={`px-4 xl:px-6`}>
          <div className={`flex h-14 justify-between`}>
            <div className={`flex`}> 
                <div
                  className={`flex flex-shrink-0 cursor-pointer items-center`}
                >
                  <img
                    className={`h-8 w-auto`}
                    src="/assets/icons/logo.svg"
                    alt="next"
                  />
                </div> 
              <div
                className={`hidden md:ml-4 md:flex md:items-center md:space-x-2 lg:space-x-3`}
              > 
                {/* <MenuItem href="/account">{t('account')}</MenuItem>
                <MenuItem href="/markets">{t('markets')}</MenuItem>
                <MenuItem href="/borrow">{t('borrow')}</MenuItem>
                <MenuItem href="/swap">{t('swap')}</MenuItem>
                <MenuItem href="/stats">{t('stats')}</MenuItem>
                <NavDropMenu
                  menuTitle={t('more')}
                  // linksArray: [name: string, href: string, isExternal: boolean]
                  linksArray={[
                    [
                      t('referrals'),
                      '/referral',
                      false,
                      <UserAddIcon className="h-4 w-4" key="referrals" />,
                    ],
                    [
                      t('calculator'),
                      '/risk-calculator',
                      false,
                      <CalculatorIcon className="h-4 w-4" key="calculator" />,
                    ],
                    [
                      t('fees'),
                      '/fees',
                      false,
                      <CurrencyDollarIcon className="h-4 w-4" key="fees" />,
                    ],
                    [
                      t('learn'),
                      'https://docs.mango.markets/',
                      true,
                      <LightBulbIcon className="h-4 w-4" key="learn" />,
                    ],
                    [
                      t('governance'),
                      'https://dao.mango.markets/',
                      true,
                      <LibraryIcon className="h-4 w-4" key="governance" />,
                    ],
                    [
                      'Mango v2',
                      'https://v2.mango.markets',
                      true,
                      <MangoIcon
                        className="h-4 w-4 stroke-current"
                        key="mango-v2"
                      />,
                    ],
                    [
                      'Mango v1',
                      'https://v1.mango.markets',
                      true,
                      <MangoIcon
                        className="h-4 w-4 stroke-current"
                        key="mango-v1"
                      />,
                    ],
                  ]}
                /> */}
              </div>
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="pl-2">
                <Settings />
              </div> 
              <ConnectWalletButton />
            </div>
          </div>
        </div>
      </nav> 
    </>
  )
}

export default TopBar
