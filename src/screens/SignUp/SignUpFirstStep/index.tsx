import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';
import { Bullet } from '../../../components/Bullet';

export function SignUpFirstStep() {
  const navigation = useNavigation();

  function handleBack() {
    navigation.navigate('SignIn', null);
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack}/>
        <Steps>
          <Bullet active />
          <Bullet />
        </Steps>
      </Header>
      <Title>
        Crie sua{`\n`}conta
      </Title>
      <Subtitle>
        Faça seu cadastro de{`\n`}forma rápida e fácil
      </Subtitle>

      <Form>
        <FormTitle>1. Dados</FormTitle>
      </Form>
    </Container>
  );
}