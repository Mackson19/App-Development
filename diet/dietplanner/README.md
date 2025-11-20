# 🥗 Diet Planner App

A personalized Indian diet-planning application built using **React Native CLI**, **Firebase Authentication**, **Firestore**, and the **Spoonacular Recipe API**.  
The app generates a daily meal plan based on your **age, height, weight, BMI, taste preference, and fitness goal**.

---

## 🚀 Features

### 🔐 Authentication
- Email/Password login  
- Email/Password signup  
- Secure Firebase authentication  
- Logout support  

### 👤 User Profile
- Enter age, height, weight  
- Choose goal: **loss / gain / maintain**  
- Choose taste: **veg / non-veg / spicy**  
- BMI automatically calculated  
- Profile stored in Firestore  

### 🍛 Personalized Indian Diet Plan
- Automatically generated daily meal plan  
- Includes:
  - Breakfast  
  - Morning snack  
  - Lunch  
  - Evening snack  
  - Dinner  
- Meals depend on:
  - Taste preference  
  - Fitness goal  
  - BMI  
- Saved in Firestore at:
  ```
  users/{uid}/dailyPlans/{YYYY-MM-DD}
  ```

### 📸 Recipe Screen (Powered by Spoonacular)
When tapping a meal:
- Fetches real recipe details using Spoonacular API  
- Shows:
  - Food image  
  - Title  
  - Nutrition (kcal)  
  - Ingredients  
  - Steps  
- Falls back to local dietEngine data if API fails  

### 🧭 Navigation
- React Navigation Stack + Bottom Tabs  
- Screens:
  - Login  
  - Signup  
  - Home  
  - Profile  
  - Recipe  

### 🎨 UI
- Built using **React Native Paper**  
- Clean and modern card-based layout  
- Fully responsive

---

## 📂 Project Structure

```
src/
  components/
    ButtonPrimary.js
    MealCard.js

  context/
    AuthContext.js

  navigation/
    AppNavigator.js

  screens/
    LoginScreen.js
    SignupScreen.js
    HomeScreen.js
    ProfileScreen.js
    RecipeScreen.js

  services/
    firebase.js
    dietEngine.js
    spoonacular.js

  utils/
    bmi.js
```

---

## 🛠 Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd dietplanner
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install required navigation and UI packages
```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install react-native-paper react-native-vector-icons
npm install react-native-screens react-native-safe-area-context
npm install firebase axios
```

### 4. Install pods (iOS only)
```bash
cd ios && pod install && cd ..
```

### 5. Run the application

Android:
```bash
npx react-native run-android
```

---

## 🔥 Firebase Setup

1. Create a Firebase project  
2. Enable **Email/Password Authentication**  
3. Create a **Firestore Database**  
4. Download `google-services.json`  
5. Place it inside:
   ```
   android/app/google-services.json
   ```
6. Replace `firebaseConfig` in `src/services/firebase.js` with your values

---

## 🔑 Spoonacular API Setup

1. Create an account at: https://spoonacular.com/food-api  
2. Generate an API key  
3. Place your key inside:
   ```
   src/services/spoonacular.js
   const API_KEY = "YOUR_KEY";
   ```

---

## 📜 License
This project is for educational and personal use.

---

## 🙌 Credits
Built with ❤️ using:
- React Native  
- Firebase  
- Spoonacular API  
- React Native Paper  
- React Navigation  
