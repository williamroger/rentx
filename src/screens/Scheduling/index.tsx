import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Alert, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { 
  Calendar, 
  DateProps, 
  MarkedDateProps, 
  generateInterval 
} from '../../components/Calendar';
import { getPlatformDate } from '../../utils/getPlataformDate';
import { CarDTO } from '../../dtos/CarDTO';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateWrapper,
  DateValue,
  Content,
  Footer,
} from './styles';
interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO,
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DateProps>({} as DateProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const theme = useTheme();
  const route = useRoute();
  const { car } = route.params as Params;
  const navigation = useNavigation();

  function handleConfirmRental() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert("Selecione o intervalo para alugar.");
    } else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates),
      });
    }
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

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
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
            <DateWrapper selected={!!rentalPeriod.startFormatted}>
              <DateValue>{rentalPeriod.startFormatted}</DateValue>
            </DateWrapper>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateWrapper selected={!!rentalPeriod.endFormatted}>
              <DateValue>{rentalPeriod.endFormatted}</DateValue>
            </DateWrapper>
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