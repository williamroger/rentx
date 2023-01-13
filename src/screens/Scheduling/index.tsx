import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { 
  Calendar, 
  DateProps, 
  MarkedDateProps, 
  generateInterval 
} from '../../components/Calendar';

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
  const [lastSelectedDate, setLastSelectedDate] = useState<DateProps>({} as DateProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);

  const theme = useTheme();

  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails');
  }
  
  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DateProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);
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
          onPress={handleBack} 
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
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button title='Confirmar' onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}