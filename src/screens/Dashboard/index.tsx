import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, { TransactionCardProps } from '../../components/TransactionCard';
import { useAuth } from '../../hooks/auth';
import { 
    Container, 
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionsList,
    LoadContainer,
    LogoutButton
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
    lastTransaction: string;
}

interface HighlightData {
    expensives: HighlightProps;
    entries: HighlightProps;
    total: HighlightProps
}

export default function Dashboard(){
    const [data, setData] = useState<DataListProps[]>([]);
    const [highlightData, sethighlightData] = useState({} as HighlightData);
    const [isLoading, setIsLoading] = useState(true);

    const { signOut, user } = useAuth();
    const theme = useTheme();

    function getLastTransactionDate(transactions : DataListProps[], type : 'positive' | 'negative' | 'any'){
        const collectionFiltered = transactions.filter(transaction => transaction.type === type || type === 'any');
        if(collectionFiltered.length === 0)
            return "";

        const lastTransaction = new Date(
            Math.max.apply(Math, 
                collectionFiltered.map(transaction => new Date(transaction.date).getTime())
            )
        );
        
        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
    }

    async function loadTransactions() {
        const dataKey = `@gofinances:transactions_user:${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesAmount = 0;
        let expensivesAmount = 0;

        const transactionsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {
            if(item.type === 'positive')
                entriesAmount += Number(item.amount);
            else
                expensivesAmount += Number(item.amount);

            const amount = Number(item.amount)
                .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit', 
                year: '2-digit'
            }).format(new Date(item.date));

            return {
                ...item,
                amount,
                date
            }
        })

        const totalAmount = entriesAmount - expensivesAmount;
        sethighlightData({
            entries: {
                amount: entriesAmount.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                lastTransaction: `Última entrada dia ${getLastTransactionDate(transactions, 'positive')}`
            },

            expensives: {
                amount: expensivesAmount.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                lastTransaction: `Última saída dia ${getLastTransactionDate(transactions, 'negative')}`
            },

            total: {
                amount: totalAmount.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                lastTransaction: `01 à ${getLastTransactionDate(transactions, 'any')}`
            }  
        });

        setData(transactionsFormatted);
        setIsLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadTransactions();
    },[]));

    return(
        <Container>
            {
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator 
                            color={theme.colors.primary}
                            size="large"
                        />
                    </LoadContainer> :
                    <>
                        <Header>
                            <UserWrapper>
                                <UserInfo>
                                    <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/46614552?v=4' }}></Photo>
                                    <User>
                                        <UserGreeting>Olá,</UserGreeting>
                                        <UserName>Patrick</UserName>
                                    </User>
                                </UserInfo>

                                <LogoutButton onPress={signOut}>
                                    <Icon name="power"/>
                                </LogoutButton>
                            </UserWrapper>
                        </Header>

                        <HighlightCards>
                            <HighlightCard title='Entradas' 
                                        amount={highlightData.entries.amount}
                                        lastTransaction={highlightData.entries.lastTransaction} 
                                        type='up' 
                            />
                            
                            <HighlightCard title='Saídas' 
                                        amount={highlightData.expensives.amount}
                                        lastTransaction={highlightData.expensives.lastTransaction} 
                                        type='down' 
                            />

                            <HighlightCard title='Total' 
                                        amount={highlightData.total.amount}
                                        lastTransaction={highlightData.total.lastTransaction}
                                        type='total' 
                            />
                        </HighlightCards>

                        <Transactions>
                            <Title>Listagem</Title>

                            <TransactionsList 
                                data={data}
                                keyExtractor={item => item.id}
                                renderItem={({item}) => <TransactionCard data={item} /> }
                            />      
                        </Transactions>
                    </>
            }
        </Container>
    );
}