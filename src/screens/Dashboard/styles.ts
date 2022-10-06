import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { FlatList, FlatListProps, TouchableOpacity } from 'react-native';
import { DataListProps } from '.';

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.background };
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${({ theme }) => theme.colors.primary };
    align-items: flex-start;
    justify-content: center;
    flex-direction: row;
`;

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${RFValue(50)}px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`;

export const User = styled.View`
    margin-left: 17px;
`;

export const UserGreeting = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium };
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`;

export const UserName = styled.Text` 
    font-family: ${({ theme }) => theme.fonts.bold };
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`;

export const Icon = styled(Feather)`
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingLeft: 9, paddingRight: 24 }
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
    flex: 1;
    padding: 0 24px;

    margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const TransactionsList = styled(
        FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>
    ).attrs({
    showsVerticalScrollIndicator: false
})``;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LogoutButton = styled(TouchableOpacity)``;