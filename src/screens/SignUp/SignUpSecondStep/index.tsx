import React, { useState } from 'react';
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback,
  Keyboard,
  Alert, 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { api } from '../../../services/api';

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
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

interface Params {
  user: {
    name: string, 
    email: string, 
    driverLicense: string,
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();
  
  const { user } = route.params as Params;
 
  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Atenção', 'Informe a senha e a confirmação e confirme');
    }

    if (password !== passwordConfirm) {
      return Alert.alert('Atenção', 'As senhas não são iguais.');
    }
    
    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password,
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        title: 'Conta criada!',
        message: `Agora é só fazer o login\n e aproveitar`,
        nextScreenRouter: 'SignIn'
      });
    })
    .catch((error) => {
      console.log(error);
      Alert.alert('Ops!', 'Não foi possível finalizar o cadastro.');
    })

    
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>
          <Title>
            Crie sua{`\n`}conta
          </Title>
          <Subtitle>
            Faça seu cadastro de{`\n`}forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput 
              iconName='lock' 
              placeholder='Senha' 
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput 
              iconName='lock' 
              placeholder='Repetir senha' 
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button 
            title='Cadastrar' 
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}