import React from "react";
import { FlatList } from 'react-native';
import Button from "../../components/Form/Button";

import { categories } from '../../utils/categories';

import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer
} from './styles';

interface Category {
    key: string;
    name: string;
}

interface Props {
    closeSelectCategory : () => void,
    setCategory: (category: Category) => void,
    category: Category
}

export default function CategorySelect({ category, setCategory, closeSelectCategory } : Props){
    
    function handleCategorySelect(category: Category) {
        setCategory(category)
    }

    return(
        <Container>
            <Header>
                <Title>Categorias</Title>
            </Header>

            <FlatList 
                data={categories}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <Category onPress={() => handleCategorySelect(item)} isActive={item.key === category.key}>
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button title="Selecionar" onPress={closeSelectCategory} />
            </Footer>
        </Container>
    );
}