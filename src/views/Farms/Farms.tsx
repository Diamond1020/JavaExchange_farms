import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Image, Heading } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd, useJavaCakeBusd, useFADCakeBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'

export interface FarmsProps{
  tokenMode?: boolean
}

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const javaPrice = useJavaCakeBusd()
  const FADPrice = useFADCakeBusd()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const {tokenMode} = farmsProps;

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X')
  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const anftOnlyFarms = activeFarms.filter(
    (farm) => farm.lpSymbol.startsWith("ANFT"),
  )

  const javaOnlyFarms = activeFarms.filter(
    (farm) => farm.lpSymbol.includes("JAVA"),
  )

  const FADOnlyFarms = activeFarms.filter(
    (farm) => farm.lpSymbol.includes("FAD") 
  )

  const stakedFADOnlyFarms = FADOnlyFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  const stakedAnftOnlyFarms = anftOnlyFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  const stakedJavaOnlyFarms = javaOnlyFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  
  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      // const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }

        let cakeRewardPerBlock = new BigNumber(farm.rewardPerBlock || 1).times(new BigNumber(farm.poolWeight)).div(new BigNumber(10).pow(18))
        if (farm.earnToken === 'ANFT')
          cakeRewardPerBlock = cakeRewardPerBlock.times(new BigNumber(10).pow(9))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)
        // const cakeRewardPerMonth = cakeRewardPerYear.div(12)
        let apy = cakePrice.times(cakeRewardPerYear);
        if (farm.earnToken === 'JAVA') {
          apy = javaPrice.times(cakeRewardPerYear);
        }

        if (farm.earnToken === 'FAD') {
          apy = FADPrice.times(cakeRewardPerYear);
        }

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0);

        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          totalValue = totalValue.times(bnbPrice);
        }

        if (farm.quoteTokenSymbol === QuoteToken.JAVA) {
          totalValue = totalValue.times(javaPrice);
        }

        if (farm.quoteTokenSymbol === QuoteToken.ANFT) {
          totalValue = totalValue.times(cakePrice).times(new BigNumber(10).pow(9));
        }

        if(totalValue.comparedTo(0) > 0){
          apy = apy.div(totalValue);
        }
        else {
          apy = new BigNumber(0);
        }
        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.num}
          farm={farm}
          removed={removed}
          bnbPrice={bnbPrice}
          cakePrice={cakePrice}
          javaPrice={javaPrice}
          FADPrice={FADPrice}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [bnbPrice, account, cakePrice, javaPrice, FADPrice, ethereum],
  )

  return (
    <Page>
      <Heading as="h1" size="lg" color="primary" mb="50px" style={{ textAlign: 'center' }}>
        { 
          tokenMode ?
            TranslateString(999, 'Stake tokens to earn')
            :
          TranslateString(999, 'Stake LP tokens to earn')
        }
      </Heading>
      <Heading as="h2" color="secondary" mb="50px" style={{ textAlign: 'center' }}>
        {TranslateString(999, 'Deposit Fee will be used to buyback')}
      </Heading>
      <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly}/>
      <div>
        <Divider />
        <FlexLayout>
          <Route exact path={`${path}`}>
            {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
          </Route>
          <Route exact path={`${path}/anft`}>
          {stakedOnly ? farmsList(stakedAnftOnlyFarms, false) : farmsList(anftOnlyFarms, false)}
          </Route>
          <Route exact path={`${path}/java`}>
          {stakedOnly ? farmsList(stakedJavaOnlyFarms, false) : farmsList(javaOnlyFarms, false)}
          </Route>
          <Route exact path={`${path}/fad`}>
            {stakedOnly ? farmsList(stakedFADOnlyFarms, false) : farmsList(FADOnlyFarms, false)}
          </Route>
        </FlexLayout>
      </div>
      <div className="responsive-bottom-image" >
        <img src="/images/egg/8.png" alt="illustration" />
      </div>
    </Page>
  )
}

export default Farms
