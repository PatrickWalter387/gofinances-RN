import React, { useState, useEffect } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/core';
import uuid from 'react-native-uuid';

import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';
import InputCategorySelect from '../../components/Form/InputCategorySelect';
import InputForm from '../../components/Form/InputForm';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';
import CategorySelect from '../../screens/CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
} from './styles';
import { useAuth } from '../../hooks/auth';

interface FormData{
    [name: string]: string;
}

const schemaValidator = Yup.object().shape({
    name: Yup.string()
        .required('Nome é obrigatório!'),

    amount: Yup.number()
        .typeError('Informe um valor numérico!')
        .positive('O valor não pode ser negativo!')
        .required('O valor é obrigatório!')
});

export default function Register(){
    const [typeTransactionSelected, setTypeTransactionSelected] = useState('positive');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    
    const { navigate }: NavigationProp<ParamListBase> = useNavigation();
    const { user } = useAuth();

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });

    const { control, handleSubmit, reset, formState : { errors } } = useForm({
        resolver: yupResolver(schemaValidator)
    });

    function handleTransactionTypeSelect(type: 'positive' | 'negative'){
        setTypeTransactionSelected(type);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    async function handleRegister(form : FormData) {
        const dataKey = `@gofinances:transactions_user:${user.id}`; 
        
        if(category.key === 'category')    
            return Alert.alert('Selecione a categoria!')

        const newTransaction  = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            category: category.key,
            type: typeTransactionSelected,
            date: new Date()
        };

        try {
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            const dataFormatted = [
                ...currentData,
                newTransaction
            ];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

            reset();
            setTypeTransactionSelected('positive');
            setCategory({
                key: 'category',
                name: 'Categoria'
            });

            navigate('Listagem');
        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível salvar");
        }
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm 
                            placeholder='Nome' 
                            name='name' 
                            control={control} 
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm 
                            placeholder='Preço' 
                            name='amount' 
                            control={control} 
                            keyboardType='numeric'
                            error={errors.amount && errors.amount.message}
                        />

                        <TransactionTypes>
                            <TransactionTypeButton 
                                title='Income' 
                                type='positive' 
                                isActive={typeTransactionSelected === 'positive'}
                                onPress={() => handleTransactionTypeSelect('positive')}
                            />

                            <TransactionTypeButton 
                                title='Outcome' 
                                type='negative' 
                                isActive={typeTransactionSelected === 'negative'} 
                                onPress={() => handleTransactionTypeSelect('negative')}
                            />
                        </TransactionTypes>

                        <InputCategorySelect onPress={handleOpenSelectCategoryModal} title={category.name} />
                    </Fields>
                    <Button title='Cadastrar' onPress={handleSubmit(handleRegister)} />
                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect 
                        closeSelectCategory={handleCloseSelectCategoryModal} 
                        category={category}
                        setCategory={setCategory}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}