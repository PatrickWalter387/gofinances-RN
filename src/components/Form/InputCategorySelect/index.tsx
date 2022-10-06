import React from "react";
import { TouchableOpacityProps } from "react-native";

import {
    Container,
    Icon,
    Title
} from './styles';

interface Props extends TouchableOpacityProps{
    title: string
}

export default function InputCategorySelect({ title, ...rest } : Props){
    return(
        <Container {...rest}>
            <Title>{title}</Title>
            <Icon name="chevron-down" />
        </Container>
    );
}