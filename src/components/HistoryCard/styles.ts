import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface Props{
    color: string
}

export const Container = styled.View<Props>`
    width: 100%;
    border-radius: 5px;
    padding: 13px 24px;
    margin-bottom: 8px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    background-color: ${({ theme }) => theme.colors.shape};

    border-left-width: 5px;
    border-left-color: ${({ color }) => color};
`;

export const Title = styled.Text`
    font-family: ${({ theme}) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.text_dark};

    font-size: ${RFValue(15)}px;
`;

export const Amount = styled.Text`
    font-family: ${({ theme}) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.text_dark};

    font-size: ${RFValue(15)}px;
`;
