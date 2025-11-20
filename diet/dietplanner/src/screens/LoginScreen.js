import React, {useState, useContext} from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function LoginScreen({ navigation }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onLogin = async ()=>{
    setLoading(true);
    setError(null);
    try{
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigation.replace('MainTabs');
    } catch(e){
      setError(e.message);
    } finally { setLoading(false); }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS==='ios'? 'padding':'height'}
    >
      <View style={styles.inner}>
        <View style={styles.headerContainer}>
          <Text style={styles.emoji}>🥗</Text>
          <Text style={styles.title}>DietPlanner</Text>
          <Text style={styles.subtitle}>Your personal nutrition companion</Text>
        </View>

        <Card style={styles.card} elevation={3}>
          <Card.Content style={styles.cardContent}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
              </View>
            ) : null}

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
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
                placeholder="Enter your password"
                style={styles.input}
                outlineColor="#e0e0e0"
                activeOutlineColor="#2e7d32"
              />
            </View>

            <Button
              mode="contained"
              onPress={onLogin}
              loading={loading}
              disabled={loading}
              style={styles.loginButton}
              contentStyle={styles.loginButtonContent}
              buttonColor="#2e7d32"
            >
              Login
            </Button>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <Button
                onPress={()=>navigation.navigate('Signup')}
                mode="text"
                textColor="#2e7d32"
                style={styles.signupButton}
              >
                Create Account
              </Button>
            </View>
          </Card.Content>
        </Card>

        <Text style={styles.footer}>Eat healthy, live happy 💚</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bed3f3ff',
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
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#ffebee',
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
  loginButton: {
    marginTop: 8,
    borderRadius: 12,
  },
  loginButtonContent: {
    paddingVertical: 8,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  signupText: {
    fontSize: 14,
    color: '#666',
  },
  signupButton: {
    marginLeft: -8,
  },
  footer: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
    color: '#888',
  },
});