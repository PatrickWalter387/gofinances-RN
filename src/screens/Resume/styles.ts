import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';

import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    height: ${RFValue(125)}px;
    background-color: ${({ theme}) => theme.colors.primary};
    padding: 19px;

    align-items: center;
    justify-content: flex-end;
`;

export const Title = styled.Text`
    font-family: ${({ theme}) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};

    font-size: ${RFValue(18)}px;
`;

export const Content = styled.ScrollView.attrs({
    contentContainerStyle: { padding: 24 },
    showsVerticalScrollIndicator: false
})`
    flex: 1;
    padding-bottom: 40px;
`;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`;

export const MonthSelect = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 24px;
`;

export const MonthSelectButton = styled(TouchableOpacity)``;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;

  color: ${({ theme }) => theme.colors.title};
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;

  color: ${({ theme }) => theme.colors.title};
`;