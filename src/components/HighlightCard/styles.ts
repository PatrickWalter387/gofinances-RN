import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface CardTypeProps {
    type: 'up' | 'down' | 'total';
}

export const Container = styled.View<CardTypeProps>`
    padding: 0 23px;
    padding-top: 19px;
    padding-bottom: 40px;
    width: ${RFValue(300)}px;
    background-color: ${({ theme, type }) => type === 'total' ? theme.colors.secondary : theme.colors.shape };
    border-radius: 5px;
    margin-left: ${RFValue(15)}px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Title = styled.Text<CardTypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular };
    color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text_dark };
    font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)<CardTypeProps>`
    font-size: ${RFValue(33)}px;
    color: ${({ theme, type }) => {
        const color = {
            up: theme.colors.success,
            down: theme.colors.attention,
            total: theme.colors.shape,
        }

        return color[type];
    }};
`;

export const Footer = styled.View`
    margin-top: ${RFValue(38)}px;
`;

export const Amount = styled.Text<CardTypeProps>`
    font-family: ${({ theme }) => theme.fonts.medium };
    color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text_dark };
    font-size: ${RFValue(32)}px;
`;

export const LastTransaction = styled.Text<CardTypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular };
    color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text };
    font-size: ${RFValue(12)}px;
`;

