import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, ActivityIndicator } from 'react-native-paper';
import { fetchRecipeFromAPI } from '../services/spoonacular';

export default function RecipeScreen({ route }){
  const { recipe } = route.params || {};
  const [apiRecipe, setApiRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const result = await fetchRecipeFromAPI(recipe.name);
      setApiRecipe(result);
      setLoading(false);
    };
    load();
  }, []);

  if (!recipe) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>No recipe provided</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text style={styles.loadingText}>Loading recipe...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.recipeTitle}>{apiRecipe?.title || recipe.name}</Text>
        <View style={styles.caloriesBadge}>
          <Text style={styles.caloriesText}>
            {apiRecipe?.nutrition || recipe.calories}
          </Text>
          <Text style={styles.caloriesLabel}>kcal</Text>
        </View>
      </View>

      <Card style={styles.card} elevation={2}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🥘</Text>
            <Text style={styles.sectionTitle}>Ingredients</Text>
          </View>
          <View style={styles.listContainer}>
            {(
              apiRecipe?.ingredients && apiRecipe.ingredients.length > 0
                ? apiRecipe.ingredients
                : recipe.ingredients && recipe.ingredients.length > 0
                  ? recipe.ingredients
                  : ['No ingredients available']
            ).map((ingredient, idx) => (
              <View key={idx} style={styles.listItem}>
                <View style={styles.bullet} />
                <Text style={styles.listText}>{ingredient}</Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card} elevation={2}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>👨‍🍳</Text>
            <Text style={styles.sectionTitle}>Instructions</Text>
          </View>
          <View style={styles.stepsContainer}>
            {(
              apiRecipe?.steps && apiRecipe.steps.length > 0
                ? apiRecipe.steps
                : recipe.steps && recipe.steps.length > 0
                  ? recipe.steps
                  : ['No steps available']
            ).map((step, idx) => (
              <View key={idx} style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{idx + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4ceceff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3ededff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#d3ceceff',
  },
  errorText: {
    fontSize: 16,
    color: '#999',
  },
  header: {
    marginBottom: 24,
  },
  recipeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    lineHeight: 34,
  },
  caloriesBadge: {
    backgroundColor: '#f1f4f2ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  caloriesText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2e7d32',
  },
  caloriesLabel: {
    fontSize: 12,
    color: '#2e7d32',
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#e1d9ffff',
    marginBottom: 16,
  },
  cardContent: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  listContainer: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2e7d32',
    marginTop: 7,
    marginRight: 12,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  stepsContainer: {
    gap: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2e7d32',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
});