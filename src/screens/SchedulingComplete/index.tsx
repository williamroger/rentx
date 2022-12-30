import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
  Container,
  Content,
  Title,
  Message,
  Footer,
} from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';
import { StatusBar } from 'expo-status-bar';

export function SchedulingComplete() {
  const { width } = useWindowDimensions();
  
  const navigation = useNavigation();

  function handleConfirm() {
    navigation.navigate('Home');
  }

  return (
    <Container>
      <StatusBar 
        style='light'
        translucent
        backgroundColor='transparent'
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até uma concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title='Ok' onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}