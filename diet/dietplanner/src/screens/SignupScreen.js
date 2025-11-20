import React, {useState} from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function SignupScreen({ navigation }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSignup = async ()=>{
    setLoading(true); 
    setError(null);
    try{
      const res = await createUserWithEmailAndPassword(auth, email.trim(), password);
      // create basic user doc
      await setDoc(doc(db, 'users', res.user.uid), { email: res.user.email });
      navigation.replace('MainTabs');
    } catch(e){ 
      setError(e.message);
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS==='ios'? 'padding':'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>
          <View style={styles.headerContainer}>
            <Text style={styles.emoji}>🌱</Text>
            <Text style={styles.title}>Join DietPlanner</Text>
            <Text style={styles.subtitle}>Start your journey to healthy eating</Text>
          </View>

          <Card style={styles.card} elevation={3}>
            <Card.Content style={styles.cardContent}>
              <Text style={styles.welcomeText}>Create Your Account</Text>
              
              {error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>⚠️ {error}</Text>
                </View>
              ) : null}

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  mode="outlined"
                  placeholder="Enter your email"
                  style={styles.input}
                  outlineColor="#e0e0e0"
                  activeOutlineColor="#2e7d32"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  mode="outlined"
                  placeholder="Create a strong password"
                  style={styles.input}
                  outlineColor="#e0e0e0"
                  activeOutlineColor="#2e7d32"
                />
                <Text style={styles.helperText}>Must be at least 6 characters</Text>
              </View>

              <Button
                mode="contained"
                onPress={onSignup}
                loading={loading}
                disabled={loading}
                style={styles.signupButton}
                contentStyle={styles.signupButtonContent}
                buttonColor="#2e7d32"
              >
                Create Account
              </Button>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <Button
                  onPress={()=>navigation.goBack()}
                  mode="text"
                  textColor="#2e7d32"
                  style={styles.loginButton}
                >
                  Login
                </Button>
              </View>
            </Card.Content>
          </Card>

          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎯</Text>
              <Text style={styles.featureText}>Personalized meal plans</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🍽️</Text>
              <Text style={styles.featureText}>Delicious recipes</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📊</Text>
              <Text style={styles.featureText}>Track your progress</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b7d2fcff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#ffffffff',
  },
  cardContent: {
    padding: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 24,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#f3f3f3ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
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
  helperText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    marginLeft: 4,
  },
  signupButton: {
    marginTop: 8,
    borderRadius: 12,
  },
  signupButtonContent: {
    paddingVertical: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginButton: {
    marginLeft: -8,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 32,
    paddingHorizontal: 16,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});