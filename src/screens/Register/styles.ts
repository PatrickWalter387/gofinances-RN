import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
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

export const Form = styled.View`
    flex: 1;
    padding: 24px;
    justify-content: space-between;
`;

export const Fields = styled.View``;

export const TransactionTypes = styled.View`
    flex-direction: row;
    margin-top: 8px;
    margin-bottom: 16px;
`;
