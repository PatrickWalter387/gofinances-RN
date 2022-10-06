import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useCallback } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { VictoryPie } from 'victory-native';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import HistoryCard from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect, 
    MonthSelectButton, 
    MonthSelectIcon, 
    Month
} from './styles';
import { useAuth } from '../../hooks/auth';

interface TransactionData {
    type: 'positive' | 'negative'
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}

export default function Resume(){
    const [isLoading, setIsLoading] = useState(true);
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const theme = useTheme();
    const { user } = useAuth();

    function handleDateChange(action : 'next' | 'prev'){
        if(action === 'next')
            setSelectedDate(addMonths(selectedDate, 1));
        else
            setSelectedDate(subMonths(selectedDate, 1));
    }

    async function loadData() {
        setIsLoading(true);
        const dataKey = `@gofinances:transactions_user:${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];
    
        const expensives = responseFormatted
            .filter((expensive: TransactionData) => 
                expensive.type === 'negative' &&
                new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
                new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
            );
    
        const expensivesTotal = expensives.reduce((accumulator: number, expensive: TransactionData) => {
          return accumulator + Number(expensive.amount);
        }, 0)
    
        const totalByCategory: CategoryData[] = [];
    
        categories.forEach(category => {
          let categorySum = 0;
    
          expensives.forEach((expensive: TransactionData) => {
            if (expensive.category === category.key) {
              categorySum += Number(expensive.amount);
            }
          })
    
          if (categorySum > 0) {
            const totalFormatted = categorySum.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })
    
            const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;
    
            totalByCategory.push({
              key: category.key,
              name: category.name,
              color: category.color,
              total: categorySum,
              totalFormatted,
              percent,
            })
          }
        })
    
        console.log(totalByCategory);
        setTotalByCategories(totalByCategory);
        setIsLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadData();
    },[selectedDate]));

    return(
        <Container>
            <Header>
                <Title>Resumo</Title>
            </Header>

            <Content>
                <MonthSelect>
                    <MonthSelectButton onPress={() => handleDateChange('prev')}>
                        <MonthSelectIcon name="chevron-left" />
                    </MonthSelectButton>

                    <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

                    <MonthSelectButton onPress={() => handleDateChange('next')}>
                        <MonthSelectIcon name="chevron-right" />
                    </MonthSelectButton>
                </MonthSelect>

                <ChartContainer>
                    <VictoryPie 
                        data={totalByCategories}
                        colorScale={totalByCategories.map(category => category.color)}
                        style={{
                            labels:{
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                                fill: theme.colors.shape
                            }
                        }}
                        labelRadius={60}
                        x='percent'
                        y='total'
                    />
                </ChartContainer>
                
                {
                    totalByCategories.map(category => (
                        <HistoryCard 
                            key={category.key}
                            title={category.name}
                            amount={category.totalFormatted}
                            color={category.color}
                        />
                    ))
                }
            </Content>
        </Container>
    );
}