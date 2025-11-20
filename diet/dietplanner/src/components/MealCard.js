import React from 'react';
import { Card, Text } from 'react-native-paper';

export default function MealCard({ item, onPress }){
  return (
    <Card style={{ marginBottom: 12 }} onPress={onPress}>
      <Card.Title title={item.name} subtitle={`${item.calories} kcal`} />
      <Card.Content>
        <Text numberOfLines={2}>{item.ingredients.join(', ')}</Text>
      </Card.Content>
    </Card>
  );
}
