import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFotterDate,
} from './styles';

interface CarProps {
  id: string;
  car: CarDTO;
  user_id: string;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');

        setCars(response.data);
      } catch (error) {
        console.log(error); 
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

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
        <Subtitle>Conforto, segurança e praticidade.</Subtitle>
      </Header>
      {loading 
      ? <Load /> 
      : (
          <Content>
            <Appointments>
              <AppointmentsTitle>Agendamentos realizados</AppointmentsTitle>
              <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
            </Appointments>

            <FlatList
              data={cars}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CarWrapper>
                  <Car data={item.car} />
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFotterDate>{item.startDate}</CarFotterDate>
                      <AntDesign
                        name='arrowright'
                        size={20}
                        color={theme.colors.text_detail}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFotterDate>{item.endDate}</CarFotterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              )}
            />
          </Content>
        )
      }
    </Container>
  );
}