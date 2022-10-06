import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.secondary};
    padding: 18px;
    align-items: center;
    border-radius: 5px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape };
    font-size: ${RFValue(14)}px;
`;