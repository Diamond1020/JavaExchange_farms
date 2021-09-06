import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import masterchefABIJava from 'config/abi/masterchefJava.json'
import masterchefABIFAD from 'config/abi/masterchefFAD.json'
import multicall from 'utils/multicall'
import { getMasterChefAddress, getMasterChefAddressJava, getMasterChefAddressFAD } from 'utils/addressHelpers'
import farmsConfig from 'config/constants/farms'
import { QuoteToken } from '../../config/constants/types'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const fetchFarms = async () => {
  const data = await Promise.all(
    farmsConfig.map(async (farmConfig) => {
      const lpAdress = farmConfig.lpAddresses[CHAIN_ID]
      const earnToken = farmConfig.earnToken
      if (earnToken === 'ANFT') {
        const calls = [
          // Balance of token in the LP contract
          {
            address: farmConfig.tokenAddresses[CHAIN_ID],
            name: 'balanceOf',
            params: [lpAdress],
          },
          // Balance of quote token on LP contract
          {
            address: farmConfig.quoteTokenAdresses[CHAIN_ID],
            name: 'balanceOf',
            params: [lpAdress],
          },
          // Balance of LP tokens in the master chef contract
          {
            address: farmConfig.isTokenOnly ? farmConfig.tokenAddresses[CHAIN_ID] : lpAdress,
            name: 'balanceOf',
            params: [getMasterChefAddress()],
          },
          // Total supply of LP tokens
          {
            address: lpAdress,
            name: 'totalSupply',
          },
          // Token decimals
          {
            address: farmConfig.tokenAddresses[CHAIN_ID],
            name: 'decimals',
          },
          // Quote token decimals
          {
            address: farmConfig.quoteTokenAdresses[CHAIN_ID],
            name: 'decimals',
          },
        ]      
  
        const [
          tokenBalanceLP,
          quoteTokenBlanceLP,
          lpTokenBalanceMC,
          lpTotalSupply,
          tokenDecimals,
          quoteTokenDecimals
        ] = await multicall(erc20, calls)
        
        const [info, totalAllocPoint, rewardPerBlock, totalStakedAmount] = await multicall(masterchefABI, [
          {
            address: getMasterChefAddress(),
            name: 'poolInfo',
            params: [farmConfig.pid],
          },
          {
            address: getMasterChefAddress(),
            name: 'getTotalAllocPoint',
          },
          {
            address: getMasterChefAddress(),
            name: 'rewardPerBlock',
          },
          {
            address: getMasterChefAddress(),
            name: 'totalStakedAmount',
          },
        ])
        
        let tokenAmount;
        let lpTotalInQuoteToken;
        let tokenPriceVsQuote;
        let quoteTokenAmount;
        
        if(farmConfig.isTokenOnly){
          if (farmConfig.tokenSymbol === 'ANFT'){
            tokenAmount = new BigNumber(totalStakedAmount).div(new BigNumber(10).pow(tokenDecimals));
          }
          else
            tokenAmount = new BigNumber(lpTokenBalanceMC).div(new BigNumber(10).pow(tokenDecimals));
          if(farmConfig.tokenSymbol === QuoteToken.BUSD && farmConfig.quoteTokenSymbol === QuoteToken.BUSD){
            tokenPriceVsQuote = new BigNumber(1);
          }else{
            tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP));
          }
  
          if (farmConfig.tokenSymbol === 'ANFT'){
            lpTotalInQuoteToken = tokenAmount.times(tokenPriceVsQuote).div(new BigNumber(10).pow(9));
          }
          else
            lpTotalInQuoteToken = tokenAmount.times(tokenPriceVsQuote);
        }else{
          // Ratio in % a LP tokens that are in staking, vs the total number in circulation
          const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))
          // Total value in staking in quote token value
          lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
            .div(new BigNumber(10).pow(18))
            .times(new BigNumber(2))
            .times(lpTokenRatio)
  
          // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
          tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
          quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
            .div(new BigNumber(10).pow(quoteTokenDecimals))
            .times(lpTokenRatio)
  
          if(tokenAmount.comparedTo(0) > 0){
            tokenPriceVsQuote = quoteTokenAmount.div(tokenAmount);
          }else{
            tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP));
          }
        }
  
        const allocPoint = new BigNumber(info.allocPoint._hex)
        const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))
  
        return {
          ...farmConfig,
          tokenAmount: tokenAmount.toJSON(),
          // quoteTokenAmount: quoteTokenAmount.toJSON(),
          lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
          tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
          poolWeight: poolWeight.toNumber(),
          multiplier: `${allocPoint.div(100).toString()}X`,
          depositFeeBP: info.depositFeeBP,
          withdrawFeeBP: info.withdrawFeeBP,
          rewardPerBlock: new BigNumber(rewardPerBlock).toNumber(),
        }
      }

      if (earnToken === 'JAVA') {
        const calls = [
          // Balance of token in the LP contract
          {
            address: farmConfig.tokenAddresses[CHAIN_ID],
            name: 'balanceOf',
            params: [lpAdress],
          },
          // Balance of quote token on LP contract
          {
            address: farmConfig.quoteTokenAdresses[CHAIN_ID],
            name: 'balanceOf',
            params: [lpAdress],
          },
          // Total supply of LP tokens
          {
            address: lpAdress,
            name: 'totalSupply',
          },
          // Token decimals
          {
            address: farmConfig.tokenAddresses[CHAIN_ID],
            name: 'decimals',
          },
          // Quote token decimals
          {
            address: farmConfig.quoteTokenAdresses[CHAIN_ID],
            name: 'decimals',
          },
        ]      
  
        const [
          tokenBalanceLP,
          quoteTokenBlanceLP,
          lpTotalSupply,
          tokenDecimals,
          quoteTokenDecimals
        ] = await multicall(erc20, calls)
        
        const [info, totalAllocPoint, rewardPerBlock, lpTokenBalanceMC] = await multicall(masterchefABIJava, [
          {
            address: getMasterChefAddressJava(),
            name: 'poolInfo',
            params: [farmConfig.pid],
          },
          {
            address: getMasterChefAddressJava(),
            name: 'getTotalAllocPoint',
          },
          {
            address: getMasterChefAddressJava(),
            name: 'rewardPerBlock',
          },
          // Balance of LP tokens in the master chef contract
          {
            address: getMasterChefAddressJava(),
            name: 'totalStakedAmount',
            params: [farmConfig.pid],
          },
        ])
        
        let tokenAmount;
        let lpTotalInQuoteToken;
        let tokenPriceVsQuote;
        let quoteTokenAmount;
        
        if(farmConfig.isTokenOnly){
          tokenAmount = new BigNumber(lpTokenBalanceMC).div(new BigNumber(10).pow(tokenDecimals));
          if(farmConfig.tokenSymbol === QuoteToken.BUSD && farmConfig.quoteTokenSymbol === QuoteToken.BUSD){
            tokenPriceVsQuote = new BigNumber(1);
          }else{
            tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP));
          }
  
          if (farmConfig.tokenSymbol === 'ANFT'){
            lpTotalInQuoteToken = tokenAmount.times(tokenPriceVsQuote).div(new BigNumber(10).pow(9));
          }
          else
            lpTotalInQuoteToken = tokenAmount.times(tokenPriceVsQuote);
        }else{
          // Ratio in % a LP tokens that are in staking, vs the total number in circulation
          const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))
          // Total value in staking in quote token value
          lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
            .div(new BigNumber(10).pow(18))
            .times(new BigNumber(2))
            .times(lpTokenRatio)
  
          // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
          tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
          quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
            .div(new BigNumber(10).pow(quoteTokenDecimals))
            .times(lpTokenRatio)
  
          if(tokenAmount.comparedTo(0) > 0){
            tokenPriceVsQuote = quoteTokenAmount.div(tokenAmount);
          }else{
            tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP));
          }
        }
  
        const allocPoint = new BigNumber(info.allocPoint._hex)
        const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))
  
        return {
          ...farmConfig,
          tokenAmount: tokenAmount.toJSON(),
          // quoteTokenAmount: quoteTokenAmount.toJSON(),
          lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
          tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
          poolWeight: poolWeight.toNumber(),
          multiplier: `${allocPoint.div(100).toString()}X`,
          depositFeeBP: info.depositFeeBP,
          withdrawFeeBP: info.withdrawFeeBP,
          rewardPerBlock: new BigNumber(rewardPerBlock).toNumber(),
        }
      }

      if (earnToken === 'FAD') {
        const calls = [
          // Balance of token in the LP contract
          {
            address: farmConfig.tokenAddresses[CHAIN_ID],
            name: 'balanceOf',
            params: [lpAdress],
          },
          // Balance of quote token on LP contract
          {
            address: farmConfig.quoteTokenAdresses[CHAIN_ID],
            name: 'balanceOf',
            params: [lpAdress],
          },
          // Balance of LP tokens in the master chef contract
          {
            address: farmConfig.isTokenOnly ? farmConfig.tokenAddresses[CHAIN_ID] : lpAdress,
            name: 'balanceOf',
            params: [getMasterChefAddressFAD()],
          },
          // Total supply of LP tokens
          {
            address: lpAdress,
            name: 'totalSupply',
          },
          // Token decimals
          {
            address: farmConfig.tokenAddresses[CHAIN_ID],
            name: 'decimals',
          },
          // Quote token decimals
          {
            address: farmConfig.quoteTokenAdresses[CHAIN_ID],
            name: 'decimals',
          },
        ]      
  
        const [
          tokenBalanceLP,
          quoteTokenBlanceLP,
          lpTokenBalanceMC,
          lpTotalSupply,
          tokenDecimals,
          quoteTokenDecimals
        ] = await multicall(erc20, calls)
        
        const [info, totalAllocPoint, rewardPerBlock, totalStakedAmount] = await multicall(masterchefABIFAD, [
          {
            address: getMasterChefAddressFAD(),
            name: 'poolInfo',
            params: [farmConfig.pid],
          },
          {
            address: getMasterChefAddressFAD(),
            name: 'getTotalAllocPoint',
          },
          {
            address: getMasterChefAddressFAD(),
            name: 'rewardPerBlock',
          },
          {
            address: getMasterChefAddressFAD(),
            name: 'totalStakedAmount',
          },
        ])
        
        let tokenAmount;
        let lpTotalInQuoteToken;
        let tokenPriceVsQuote;
        let quoteTokenAmount;
        
        if(farmConfig.isTokenOnly){
          if (farmConfig.tokenSymbol === 'FAD'){
            tokenAmount = new BigNumber(totalStakedAmount).div(new BigNumber(10).pow(tokenDecimals));
          }
          else
            tokenAmount = new BigNumber(lpTokenBalanceMC).div(new BigNumber(10).pow(tokenDecimals));
          if(farmConfig.tokenSymbol === QuoteToken.BUSD && farmConfig.quoteTokenSymbol === QuoteToken.BUSD){
            tokenPriceVsQuote = new BigNumber(1);
          }else{
            tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP));
          }

          lpTotalInQuoteToken = tokenAmount.times(tokenPriceVsQuote);
        }else{
          // Ratio in % a LP tokens that are in staking, vs the total number in circulation
          const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))
          // Total value in staking in quote token value
          lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
            .div(new BigNumber(10).pow(18))
            .times(new BigNumber(2))
            .times(lpTokenRatio)
  
          // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
          tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
          quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
            .div(new BigNumber(10).pow(quoteTokenDecimals))
            .times(lpTokenRatio)
  
          if(tokenAmount.comparedTo(0) > 0){
            tokenPriceVsQuote = quoteTokenAmount.div(tokenAmount);
          }else{
            tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP));
          }
        }
  
        const allocPoint = new BigNumber(info.allocPoint._hex)
        const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))
  
        return {
          ...farmConfig,
          tokenAmount: tokenAmount.toJSON(),
          // quoteTokenAmount: quoteTokenAmount.toJSON(),
          lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
          tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
          poolWeight: poolWeight.toNumber(),
          multiplier: `${allocPoint.div(100).toString()}X`,
          depositFeeBP: info.depositFeeBP,
          withdrawFeeBP: info.withdrawFeeBP,
          rewardPerBlock: new BigNumber(rewardPerBlock).toNumber(),
        }
      }
      return null
    }),
  )
  return data
}

export default fetchFarms
