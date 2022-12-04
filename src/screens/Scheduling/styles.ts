import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface DateProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 325px;

  background-color: ${({ theme }) => theme.colors.header};

  justify-content: center;
  padding: 24px;

  padding-top: ${getStatusBarHeight() + 30}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(34)}pxs;

  margin-top: 24px;
`;

export const RentalPeriod = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 32px 0;
`;

export const DateInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}pxs;
  text-transform: uppercase;
`;

export const Date = styled.View<DateProps>`
  ${({ selected, theme }) => !selected && css`
     border-bottom-width: 1px;
     border-bottom-style: solid;
     border-bottom-color: ${theme.colors.text};
     padding-bottom: 5px;
  `}
`;

export const DateValue = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;

export const Content = styled.ScrollView.attrs({
 contentContainerStyle: {
  paddingBottom: 24, 
 },
 showVerticalScrollIndicator: false,
})``;

export const Footer = styled.View`
  padding: 24px
`;
