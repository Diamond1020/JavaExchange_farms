import React from 'react'
import { Text } from '@pancakeswap-libs/uikit'
import getTimePeriods from 'utils/getTimePeriods'

const WithdrawalDelayTimer: React.FC<{ secondsRemaining: number }> = ({ secondsRemaining }) => {
  const { days, hours, minutes } = getTimePeriods(secondsRemaining)

  return <Text fontSize="14px"> {days}d {hours}h {minutes}m until Withdraw</Text>
}

export default WithdrawalDelayTimer
