/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import farmsConfig from 'config/constants/farms'
import fetchFarms from './fetchFarms'
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
  fetchFarmUserEarningsJava,
  fetchFarmUserAllowancesJava,
  fetchFarmUserTokenBalancesJava,
  fetchFarmUserStakedBalancesJava,
  fetchFarmUserEarningsFAD,
  fetchFarmUserAllowancesFAD,
  fetchFarmUserTokenBalancesFAD,
  fetchFarmUserStakedBalancesFAD,
} from './fetchFarmUser'
import { FarmsState, Farm } from '../types'

const initialState: FarmsState = { data: [...farmsConfig] }

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setFarmsPublicData: (state, action) => {
      const liveFarmsData: Farm[] = action.payload
      state.data = state.data.map((farm) => {
        const liveFarmData = liveFarmsData.find((f) => f.num === farm.num)
        return { ...farm, ...liveFarmData }
      })
    },
    setFarmUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
  },
})

// Actions
export const { setFarmsPublicData, setFarmUserData } = farmsSlice.actions

// Thunks
export const fetchFarmsPublicDataAsync = () => async (dispatch) => {
  const farms = await fetchFarms()
  dispatch(setFarmsPublicData(farms))
}
export const fetchFarmUserDataAsync = (account) => async (dispatch) => {
  let userFarmAllowances = await fetchFarmUserAllowances(account)
  let userFarmTokenBalances = await fetchFarmUserTokenBalances(account)
  let userStakedBalances = await fetchFarmUserStakedBalances(account)
  let userFarmEarnings = await fetchFarmUserEarnings(account)

  const userFarmAllowancesJava = await fetchFarmUserAllowancesJava(account)
  const userFarmTokenBalancesJava = await fetchFarmUserTokenBalancesJava(account)
  const userStakedBalancesJava = await fetchFarmUserStakedBalancesJava(account)
  const userFarmEarningsJava = await fetchFarmUserEarningsJava(account)

  const userFarmAllowancesFAD = await fetchFarmUserAllowancesFAD(account)
  const userFarmTokenBalancesFAD = await fetchFarmUserTokenBalancesFAD(account)
  const userStakedBalancesFAD = await fetchFarmUserStakedBalancesFAD(account)
  const userFarmEarningsFAD = await fetchFarmUserEarningsFAD(account)

  userFarmAllowances = [...userFarmAllowances, ...userFarmAllowancesFAD, ...userFarmAllowancesJava,]
  userFarmTokenBalances = [...userFarmTokenBalances, ...userFarmTokenBalancesFAD, ...userFarmTokenBalancesJava]
  userStakedBalances = [...userStakedBalances, ...userStakedBalancesFAD, ...userStakedBalancesJava]
  userFarmEarnings = [...userFarmEarnings, ...userFarmEarningsFAD, ...userFarmEarningsJava]
  
  const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
    return {
      index,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],      
    }
  })

  dispatch(setFarmUserData({ arrayOfUserDataObjects }))
}

export default farmsSlice.reducer
