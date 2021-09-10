import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, IconButton, AddIcon, MinusIcon, useModal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import useStakeJava from 'hooks/useStakeJava'
import useUnstakeJava from 'hooks/useUnstakeJava'
import useStakeFAD from 'hooks/useStakeFAD'
import useUnstakeFAD from 'hooks/useUnstakeFAD'
import { getBalanceNumber } from 'utils/formatBalance'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'

interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  earnToken?: string
  depositFeeBP?: number
  withdrawFeeBP?: number
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

const StakeAction: React.FC<FarmCardActionsProps> = ({ stakedBalance, tokenBalance, tokenName, pid, earnToken, depositFeeBP, withdrawFeeBP}) => {
  const TranslateString = useI18n()
  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)
  const { onStakeJava } = useStakeJava(pid)
  const { onUnstakeJava } = useUnstakeJava(pid)
  const { onStakeFAD } = useStakeFAD(pid)
  const { onUnstakeFAD } = useUnstakeFAD(pid)

  const rawStakedBalance = ((pid === 0 && earnToken === 'ANFT') || (pid === 2  && earnToken === 'FAD')) ? getBalanceNumber(stakedBalance, 9) : getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()

  const [onPresentDeposit] = useModal(<DepositModal max={tokenBalance} onConfirm={onStake} tokenName={tokenName} depositFeeBP={depositFeeBP} withdrawFeeBP={withdrawFeeBP} />)
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={tokenName} />,
  )

  const [onPresentDepositJava] = useModal(<DepositModal max={tokenBalance} onConfirm={onStakeJava} tokenName={tokenName} depositFeeBP={depositFeeBP} withdrawFeeBP={withdrawFeeBP} />)
  const [onPresentWithdrawJava] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstakeJava} tokenName={tokenName} />,
  )

  const [onPresentDepositFAD] = useModal(<DepositModal max={tokenBalance} onConfirm={onStakeFAD} tokenName={tokenName} depositFeeBP={depositFeeBP} withdrawFeeBP={withdrawFeeBP} />)
  const [onPresentWithdrawFAD] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstakeFAD} tokenName={tokenName} />,
  )

  const renderStakingButtons = () => {
    return rawStakedBalance === 0 ? (
      <>
        { 
          (earnToken === 'ANFT') && 
          <Button marginLeft='45px' onClick={onPresentDeposit}>{TranslateString(999, 'Stake')}</Button>
        }
        { 
          (earnToken === 'JAVA') && 
          <Button marginLeft='45px' onClick={onPresentDepositJava}>{TranslateString(999, 'Stake')}</Button>
        }
        { 
          (earnToken === 'FAD') && 
          <Button marginLeft='45px' onClick={onPresentDepositFAD}>{TranslateString(999, 'Stake')}</Button>
        }
      </>
    ) : (
      <IconButtonWrapper>
        { (earnToken === 'ANFT') && 
          ( 
          <>
            <IconButton variant="tertiary" onClick={onPresentWithdraw} mr="6px">
              <MinusIcon color="primary" />
            </IconButton>
            <IconButton variant="tertiary" onClick={onPresentDeposit}>
              <AddIcon color="primary" />
            </IconButton>
          </>  
          )
        }
        { (earnToken === 'JAVA') && 
          ( 
          <>
            <IconButton variant="tertiary" onClick={onPresentWithdrawJava} mr="6px">
              <MinusIcon color="primary" />
            </IconButton>
            <IconButton variant="tertiary" onClick={onPresentDepositJava}>
              <AddIcon color="primary" />
            </IconButton>
          </>  
          )
        }
        { (earnToken === 'FAD') && 
          ( 
          <>
            <IconButton variant="tertiary" onClick={onPresentWithdrawFAD} mr="6px">
              <MinusIcon color="primary" />
            </IconButton>
            <IconButton variant="tertiary" onClick={onPresentDepositFAD}>
              <AddIcon color="primary" />
            </IconButton>
          </>  
          )
        }
      </IconButtonWrapper>
    )
  }

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Heading color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
      {renderStakingButtons()}
    </Flex>
  )
}

export default StakeAction
