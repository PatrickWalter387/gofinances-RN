import React from 'react';
import { Controller, Control } from 'react-hook-form';

import {
    Container,
    Error
} from './styles';

import Input from '../Input';
import { TextInputProps } from 'react-native';

interface Props extends TextInputProps{
    name: string,
    control: Control,
    error: any
}

export default function InputForm({ error, name, control, ...rest} : Props){
    return(
        <Container>
            <Controller 
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <Input
                      onChangeText={onChange}
                      value={value}
                      {...rest}
                    />
                  )}
            />

            {error && <Error>{error}</Error>}
        </Container>
    );
}