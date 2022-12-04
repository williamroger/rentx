import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import ArrowSvg from '../../assets/arrow.svg';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  Date,
  DateValue,
  Content,
  Footer,
} from './styles';

export function Scheduling() {
  const theme = useTheme();

  return (
    <Container>
      <Header>
        <StatusBar 
          translucent 
          barStyle='light-content'
          backgroundColor='transparent' 
        />
        <BackButton 
          color={theme.colors.shape}
          onPress={() => console.log('button was pressed.')} 
        />
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel.
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <Date selected={false}>
              <DateValue></DateValue>
            </Date>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <Date selected={false}>
              <DateValue></DateValue>
            </Date>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>

      </Content>

      <Footer>
        <Button title='Confirmar' />
      </Footer>
    </Container>
  );
}