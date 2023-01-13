import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { ptBR } from './localeConfig';
import { generateInterval } from './generateInterval';

import { 
  Calendar as CustomCalendar,
  LocaleConfig,
} from 'react-native-calendars';

LocaleConfig.locales['pt-br'] = ptBR;

LocaleConfig.defaultLocale = 'pt-br';

interface DateProps {
  year: number;
  month: number;
  day: number;
  timestamp: number;
  dateString: string;
};
interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disabledTouchEvent?: boolean;
  }
};
interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: (date: DateProps) => void;
};

function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme();

  return (
    <CustomCalendar 
      renderArrow={( direction ) => 
        <Feather 
          size={24}
          color={theme.colors.text}
          name={ direction == 'left' ? 'chevron-left' : 'chevron-right' }
        />
      }
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        textMonthFontFamily: theme.fonts.secondary_600,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        }
      }}
      firstDay={1}
      minDate={String(new Date())}
      markingType='period'
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export {
  Calendar,
  MarkedDateProps,
  DateProps,
  generateInterval,
}