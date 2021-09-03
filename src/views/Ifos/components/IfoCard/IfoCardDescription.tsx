import React, { useState } from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

export interface IfoCardDescriptionProps {
  defaultIsOpen?: boolean
  description: string
}

const StyledIfoCardDescription = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
`

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: block;
  font-weight: 600;
  outline: 0;
  padding: 24px 16px;
  width: 100%;
`

const Description = styled(Text)<{ isOpen: boolean }>`
  color: ${({ theme }) => theme.colors.textSubtle};
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`

const IfoCardDescription: React.FC<IfoCardDescriptionProps> = ({ defaultIsOpen = true, description }) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)
  const TranslateString = useI18n()

  const handleClick = () => setIsOpen(!isOpen)

  return (
    <StyledIfoCardDescription>
      <Divider />
      <ToggleButton onClick={handleClick}>
        {isOpen ? TranslateString(999, 'Hide') : TranslateString(999, 'Show')}
      </ToggleButton>
      <Description isOpen={isOpen}>{description}
      <Text>----------------</Text>
      <Text>FAD JILO Fund Allocation:</Text>
      <Text>- 60% added to Liquidty</Text>
      <Text>- 20% FAD developer Team</Text>
      <Text>- 10% Javaswap JILO Fees</Text>
      <Text>- 5% ANFT to Burn</Text>
      <Text>- 5% Buy Back Java</Text>
      </Description>
    </StyledIfoCardDescription>
  )
}

export default IfoCardDescription
