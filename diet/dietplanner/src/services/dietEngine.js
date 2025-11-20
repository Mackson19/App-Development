export function generateDailyPlan({ age, bmi, taste, goal }) {
  let targetCalories = 2000;
  if (goal === 'loss') targetCalories = 1500;
  if (goal === 'gain') targetCalories = 2500;

  const breakfastOptions = {
    veg: [
      { name: 'Poha', calories: 300, ingredients: ['Flattened rice','Peanuts','Onion','Lemon'], steps: ['Cook poha','Add peanuts and onion','Garnish with lemon'] },
      { name: 'Upma', calories: 320, ingredients: ['Rava','Veggies','Mustard seeds'], steps: ['Roast rava','Saute veggies','Cook together'] },
      { name: 'Idli & Sambar', calories: 350, ingredients: ['Rice batter','Dal','Vegetables'], steps: ['Steam idli','Cook sambar','Serve hot'] }
    ],
    nonveg: [
      { name: 'Egg Bhurji', calories: 350, ingredients: ['Eggs','Onion','Tomato','Spices'], steps: ['Scramble eggs','Add masala','Cook together'] }
    ]
  };

  const lunchOptions = {
    veg: [
      { name: 'Rajma Chawal', calories: 550, ingredients: ['Kidney beans','Rice','Masala'], steps: ['Pressure cook rajma','Prepare gravy','Serve with rice'] },
      { name: 'Veg Khichdi', calories: 450, ingredients: ['Rice','Dal','Vegetables'], steps: ['Cook dal & rice','Add veggies','Simmer well'] }
    ],
    nonveg: [
      { name: 'Chicken Curry & Rice', calories: 650, ingredients: ['Chicken','Spices','Onion','Rice'], steps: ['Cook curry','Steam rice','Serve together'] }
    ],
    spicy: [
      { name: 'Paneer Tikka Masala', calories: 600, ingredients: ['Paneer','Tomato gravy','Masala'], steps: ['Grill paneer','Prepare gravy','Mix and serve'] }
    ]
  };

  const dinnerOptions = {
    veg: [
      { name: 'Roti + Dal + Salad', calories: 500, ingredients: ['Wheat flour','Dal','Veggies'], steps: ['Cook roti','Boil dal','Make salad'] }
    ],
    nonveg: [
      { name: 'Grilled Chicken + Salad', calories: 550, ingredients: ['Chicken breast','Veggies','Olive oil'], steps: ['Grill chicken','Toss veggies','Serve'] }
    ],
    spicy: [
      { name: 'Masala Dosa', calories: 450, ingredients: ['Rice batter','Potato masala'], steps: ['Cook dosa','Add masala','Serve hot'] }
    ]
  };

  const snack1 = { name: 'Fruits & Nuts', calories: 200, ingredients: ['Apple','Almonds'], steps: ['Cut fruits','Add nuts'] };
  const snack2 = { name: 'Curd with Honey', calories: 180, ingredients: ['Curd','Honey'], steps: ['Scoop curd','Add honey'] };

  function choose(options) {
    if (options[taste]) return options[taste][0];
    if (taste === 'spicy' && options.spicy) return options.spicy[0];
    return options.veg[0];
  }

  const breakfast = choose(breakfastOptions);
  const lunch = choose(lunchOptions);
  const dinner = choose(dinnerOptions);

  return {
    date: new Date().toISOString().slice(0, 10),
    targetCalories,
    breakfast,
    snack1,
    lunch,
    snack2,
    dinner
  };
}