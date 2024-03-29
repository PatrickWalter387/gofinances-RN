import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    padding: 18px 16px;
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;
    margin-bottom: 8px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.text};
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;
