import React, {useState} from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Card, SegmentedButtons } from 'react-native-paper';
import { calculateBMI } from '../utils/bmi';
import { auth, db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function ProfileScreen({ navigation }){
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('maintain');
  const [taste, setTaste] = useState('veg');

  const onSave = async ()=>{
    const bmi = calculateBMI(Number(height), Number(weight));
    const uid = auth.currentUser.uid;
    await setDoc(doc(db,'users',uid),{ age: Number(age), height: Number(height), weight: Number(weight), bmi, goal, taste }, { merge:true });
    navigation.replace('MainTabs');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.emoji}>👤</Text>
        <Text style={styles.title}>Setup Your Profile</Text>
        <Text style={styles.subtitle}>Let's personalize your meal plan</Text>
      </View>

      <Card style={styles.card} elevation={2}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Age</Text>
            <TextInput
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              mode="outlined"
              placeholder="Enter your age"
              style={styles.input}
              outlineColor="#e0e0e0"
              activeOutlineColor="#2e7d32"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Height (cm)</Text>
            <TextInput
              value={height}
              onChangeText={setHeight}
              keyboardType="number-pad"
              mode="outlined"
              placeholder="Enter your height"
              style={styles.input}
              outlineColor="#e0e0e0"
              activeOutlineColor="#2e7d32"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Weight (kg)</Text>
            <TextInput
              value={weight}
              onChangeText={setWeight}
              keyboardType="number-pad"
              mode="outlined"
              placeholder="Enter your weight"
              style={styles.input}
              outlineColor="#e0e0e0"
              activeOutlineColor="#2e7d32"
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card} elevation={2}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.sectionTitle}>Your Goal</Text>
          
          <View style={styles.optionGroup}>
            <TouchableOpacity
              style={[styles.optionCard, goal === 'loss' && styles.optionCardActive]}
              onPress={() => setGoal('loss')}
            >
              <Text style={styles.optionEmoji}>📉</Text>
              <Text style={[styles.optionText, goal === 'loss' && styles.optionTextActive]}>
                Weight Loss
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionCard, goal === 'maintain' && styles.optionCardActive]}
              onPress={() => setGoal('maintain')}
            >
              <Text style={styles.optionEmoji}>⚖️</Text>
              <Text style={[styles.optionText, goal === 'maintain' && styles.optionTextActive]}>
                Maintain
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionCard, goal === 'gain' && styles.optionCardActive]}
              onPress={() => setGoal('gain')}
            >
              <Text style={styles.optionEmoji}>📈</Text>
              <Text style={[styles.optionText, goal === 'gain' && styles.optionTextActive]}>
                Weight Gain
              </Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card} elevation={2}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.sectionTitle}>Food Preference</Text>
          
          <View style={styles.optionGroup}>
            <TouchableOpacity
              style={[styles.optionCard, taste === 'veg' && styles.optionCardActive]}
              onPress={() => setTaste('veg')}
            >
              <Text style={styles.optionEmoji}>🥗</Text>
              <Text style={[styles.optionText, taste === 'veg' && styles.optionTextActive]}>
                Vegetarian
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionCard, taste === 'non-veg' && styles.optionCardActive]}
              onPress={() => setTaste('non-veg')}
            >
              <Text style={styles.optionEmoji}>🍖</Text>
              <Text style={[styles.optionText, taste === 'non-veg' && styles.optionTextActive]}>
                Non-Veg
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionCard, taste === 'spicy' && styles.optionCardActive]}
              onPress={() => setTaste('spicy')}
            >
              <Text style={styles.optionEmoji}>🌶️</Text>
              <Text style={[styles.optionText, taste === 'spicy' && styles.optionTextActive]}>
                Spicy
              </Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={onSave}
        style={styles.saveButton}
        contentStyle={styles.saveButtonContent}
        buttonColor="#2e7d32"
      >
        Save Profile
      </Button>

      <Button
        mode="outlined"
        onPress={async () => {
          await signOut(auth);
          navigation.replace('Login');
        }}
        style={styles.logoutButton}
        contentStyle={styles.logoutButtonContent}
        textColor="#666"
      >
        Logout
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efd6d6ff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
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
  card: {
    borderRadius: 16,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  cardContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
  },
  optionGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  optionCard: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardActive: {
    backgroundColor: '#e8f5e9',
    borderColor: '#2e7d32',
  },
  optionEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  optionTextActive: {
    color: '#2e7d32',
  },
  saveButton: {
    marginTop: 8,
    borderRadius: 12,
  },
  saveButtonContent: {
    paddingVertical: 8,
  },
  logoutButton: {
    marginTop: 12,
    borderRadius: 12,
    borderColor: '#e0e0e0',
  },
  logoutButtonContent: {
    paddingVertical: 8,
  },
});