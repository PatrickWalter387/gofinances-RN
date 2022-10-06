import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
    Container,
    Icon,
    Title
} from './styles';

interface Props extends TouchableOpacityProps{
    title: string
    type: 'positive' | 'negative',
    isActive: boolean
}

export default function TransactionTypeButton({ type, title, isActive, ...rest} : Props) {
    return (
        <Container type={type} {...rest} isActive={isActive}>
            <Icon type={type} name='arrow-up-circle'/>

            <Title>
                {title}
            </Title>
        </Container>
    );
} 