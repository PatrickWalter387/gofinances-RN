import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface TransactionTypeProps{
    type: 'positive' | 'negative',
}

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.shape };
    padding: 17px 24px 19px;
    border-radius: 5px;
    margin-bottom: 16px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular };
    color: ${({ theme }) => theme.colors.text_dark };
    font-size: ${RFValue(14)}px;
`;

export const Amount = styled.Text<TransactionTypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular };
    color: ${({ theme, type }) => type === 'positive' ? theme.colors.success : theme.colors.attention };
    font-size: ${RFValue(20)}px;
`;

export const Footer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 19px;
`;

export const Category = styled.View`
    flex-direction: row;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.text };
`;

export const CategoryName = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular };
    color: ${({ theme }) => theme.colors.text };
    font-size: ${RFValue(14)}px;
    margin-left: 15px;
`;

export const Date = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular };
    color: ${({ theme }) => theme.colors.text };
    font-size: ${RFValue(14)}px;
`;
