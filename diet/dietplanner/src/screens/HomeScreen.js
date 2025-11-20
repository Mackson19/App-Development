import React, {useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, FAB } from 'react-native-paper';
import { generateDailyPlan } from '../services/dietEngine';
import { auth, db } from '../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function HomeScreen({ navigation }){
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);

  const loadPlan = async () => {
    const uid = auth.currentUser.uid;

    // today's date
    const today = new Date().toISOString().slice(0,10);

    // reference for today's plan
    const planRef = doc(db, 'users', uid, 'dailyPlans', today);
    const planSnap = await getDoc(planRef);

    if(planSnap.exists()){
      // already generated
      setPlan(planSnap.data());
      return planSnap.data();
    }

    // fetch user profile
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if(!userSnap.exists()){
      return null;
    }

    const profile = userSnap.data();
    const generated = generateDailyPlan(profile);

    // save to Firestore
    await setDoc(planRef, generated);

    setPlan(generated);
    return generated;
  };

  useEffect(()=>{
    const fetchData = async () => {
      setLoading(true);
      await loadPlan();
      setLoading(false);
    };

    fetchData();
  },[]);

  const handleRegeneratePlan = async () => {
    setRegenerating(true);
    
    const uid = auth.currentUser.uid;
    const today = new Date().toISOString().slice(0,10);
    
    // fetch user profile
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if(!userSnap.exists()){
      setRegenerating(false);
      return;
    }

    const profile = userSnap.data();
    const generated = generateDailyPlan(profile);

    // overwrite today's plan
    const planRef = doc(db, 'users', uid, 'dailyPlans', today);
    await setDoc(planRef, generated);

    setPlan(generated);
    setRegenerating(false);
  };

  const getMealIcon = (key) => {
    const icons = {
      breakfast: '🌅',
      snack1: '🍎',
      lunch: '🍽️',
      snack2: '🥤',
      dinner: '🌙'
    };
    return icons[key] || '🍴';
  };

  const getMealLabel = (key) => {
    const labels = {
      breakfast: 'Breakfast',
      snack1: 'Morning Snack',
      lunch: 'Lunch',
      snack2: 'Afternoon Snack',
      dinner: 'Dinner'
    };
    return labels[key] || key;
  };

  if(loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading your plan...</Text>
      </View>
    );
  }
  
  if(!plan) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No plan available</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good day! 👋</Text>
          <Text style={styles.title}>Today's Meal Plan</Text>
          <Text style={styles.subtitle}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
        </View>

        <View style={styles.mealsContainer}>
          {['breakfast','snack1','lunch','snack2','dinner'].map(key=>{
            const item = plan[key];
            return (
              <Card 
                key={key} 
                style={styles.mealCard} 
                onPress={()=>navigation.navigate('Recipe',{recipe:item})}
                elevation={2}
              >
                <Card.Content style={styles.cardContent}>
                  <View style={styles.mealHeader}>
                    <View style={styles.mealTitleRow}>
                      <Text style={styles.mealIcon}>{getMealIcon(key)}</Text>
                      <View style={styles.mealInfo}>
                        <Text style={styles.mealLabel}>{getMealLabel(key)}</Text>
                        <Text style={styles.mealName}>{item.name}</Text>
                      </View>
                    </View>
                    <View style={styles.caloriesBadge}>
                      <Text style={styles.caloriesText}>{item.calories}</Text>
                      <Text style={styles.caloriesLabel}>kcal</Text>
                    </View>
                  </View>
                  <Text style={styles.ingredients} numberOfLines={2}>
                    {item.ingredients.join(' • ')}
                  </Text>
                </Card.Content>
              </Card>
            );
          })}
        </View>
      </ScrollView>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcaa75ff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e2e2ff',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  mealsContainer: {
    gap: 16,
  },
  mealCard: {
    borderRadius: 16,
    backgroundColor: '#eed4d4ff',
    marginBottom: 16,
  },
  cardContent: {
    padding: 16,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  mealTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mealIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  mealInfo: {
    flex: 1,
  },
  mealLabel: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  caloriesBadge: {
    backgroundColor: '#b7f7bdff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caloriesText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2e7d32',
  },
  caloriesLabel: {
    fontSize: 10,
    color: '#4da051ff',
    marginTop: -2,
  },
  ingredients: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2dc435ff',
  },
});