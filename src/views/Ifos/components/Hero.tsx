import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap-libs/uikit'
import Container from 'components/layout/Container'
import useI18n from 'hooks/useI18n'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 24px;
`

const Blurb = styled(Text)`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`

const StyledHero = styled.div`
  background-image: linear-gradient(180deg, #4838a8 0%, #8272e2 100%);
  padding-bottom: 40px;
  padding-top: 40px;
  margin-bottom: 32px;
  display : flex;
`

const StyledLogo = styled.div`
  margin-left: 100px;
  width: 100px;
  height: 40px;
`
const Hero = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>
      <StyledLogo>
        <img src="/images/ifos/jiloLogo.png" alt="jiloLogo" width="100px" height="60x" />
      </StyledLogo>
      <Container>
        <Title>{TranslateString(999, ' JILO: Javaswap Initial Liquidity Offerings')}</Title>
        <Blurb>{TranslateString(999, 'Buy new tokens with a JILO Brand new model Javaswap initial Liquidity Offering.')}</Blurb>
      </Container>
    </StyledHero>
  )
}

export default Hero
