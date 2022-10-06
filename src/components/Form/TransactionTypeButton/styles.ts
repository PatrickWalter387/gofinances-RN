import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props{
    type: 'positive' | 'negative',
    isActive: boolean
}

export const Container = styled.TouchableOpacity<Props>`
    padding: 18px 37px;

    ${({ isActive, theme }) => !isActive && css`
        border: 1.5px solid ${theme.colors.text};
    `}

    border-radius: 5px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex: 1;
    margin: 5px;

    ${({ type, isActive, theme }) => type === 'positive' && isActive && css`
        background-color: ${theme.colors.success_light}};
    `}

    ${({ type, isActive, theme }) => type === 'negative' && isActive && css`
        background-color: ${theme.colors.attention_light}};
    `}
`;

export const Icon = styled(Feather)<Props>`
    font-size: ${RFValue(20)}px;
    color: ${({ type, theme }) => type == 'positive' ? theme.colors.success : theme.colors.attention}
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text_dark};
    font-size: ${RFValue(14)}px;
    margin-left: 8px;
`;