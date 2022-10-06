import React from 'react';
import { TextInputProps } from 'react-native';

import {
    Container
} from './styles';

export default function Input({...rest } : TextInputProps){
    return (
        <Container {...rest} />
    );
}