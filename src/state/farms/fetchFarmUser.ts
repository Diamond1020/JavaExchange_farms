import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import masterchefABIJava from 'config/abi/masterchefJava.json'
import masterchefABIFAD from 'config/abi/masterchefFAD.json'
import multicall from 'utils/multicall'
import farmsConfigANFT from 'config/constants/farmsANFT'
import farmsConfigJAVA from 'config/constants/farmsJAVA'
import farmsConfigFAD from 'config/constants/farmsFAD'
import { getMasterChefAddress, getMasterChefAddressJava, getMasterChefAddressFAD } from 'utils/addressHelpers'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchFarmUserAllowances = async (account: string) => {
  const masterChefAdress = getMasterChefAddress()

  const calls = farmsConfigANFT.map((farm) => {
      const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
      return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAdress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string) => {
  const calls = farmsConfigANFT.map((farm) => {
    const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string) => {
  const masterChefAdress = getMasterChefAddress()

  const calls = farmsConfigANFT.map((farm) => {
    return {
      address: masterChefAdress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string) => {
  const masterChefAdress = getMasterChefAddress()
  const calls = farmsConfigANFT.map((farm) => {
    return {
      address: masterChefAdress,
      name: 'pendingANFT',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(masterchefABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}




export const fetchFarmUserAllowancesJava = async (account: string) => {
  const masterChefAdress = getMasterChefAddressJava()

  const calls = farmsConfigJAVA.map((farm) => {
      const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
      return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAdress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalancesJava = async (account: string) => {
  const calls = farmsConfigJAVA.map((farm) => {
    const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalancesJava = async (account: string) => {
  const masterChefAdress = getMasterChefAddressJava()

  const calls = farmsConfigJAVA.map((farm) => {
    return {
      address: masterChefAdress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefABIJava, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarningsJava = async (account: string) => {
  const masterChefAdress = getMasterChefAddressJava()
  const calls = farmsConfigJAVA.map((farm) => {
    return {
      address: masterChefAdress,
      name: 'pendingJAVA',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(masterchefABIJava, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}





export const fetchFarmUserAllowancesFAD = async (account: string) => {
  const masterChefAdress = getMasterChefAddressFAD()

  const calls = farmsConfigFAD.map((farm) => {
      const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
      return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAdress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalancesFAD = async (account: string) => {
  const calls = farmsConfigFAD.map((farm) => {
    const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalancesFAD = async (account: string) => {
  const masterChefAdress = getMasterChefAddressFAD()

  const calls = farmsConfigFAD.map((farm) => {
    return {
      address: masterChefAdress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefABIFAD, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarningsFAD = async (account: string) => {
  const masterChefAdress = getMasterChefAddressFAD()
  const calls = farmsConfigFAD.map((farm) => {
    return {
      address: masterChefAdress,
      name: 'pendingFAD',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(masterchefABIFAD, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}