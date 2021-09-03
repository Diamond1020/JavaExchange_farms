import React, { useEffect, useCallback, useState } from 'react'
import Page from 'components/layout/Page'
import useI18n from 'hooks/useI18n'
import { Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'

const Hero = styled.div`
  align-items: center;
  background-image: url('/images/egg/123.png');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/egg/123.png'), url('/images/egg/3b.png');
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const ComingSoon: React.FC = () => {
    const TranslateString = useI18n()
    return (
        <Page>
            <Hero>
                {/* <Heading as="h1" size="xl" mb="24px" color="secondary"> */}
                {/* {TranslateString(576, 'ANFTTT Finance')} */}
                {/* </Heading> */}
                {/* <Text>{TranslateString(578, 'The only yield farm for anft lovers.')}</Text> */}
            </Hero>
        </Page>
    )
}

export default ComingSoon