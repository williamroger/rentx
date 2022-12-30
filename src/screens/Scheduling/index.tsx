import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

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

  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails');
  }
  
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
              <DateValue>17/12/2022</DateValue>
            </Date>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <Date selected={false}>
              <DateValue>27/12/2022</DateValue>
            </Date>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title='Confirmar' onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}