export function calculateBMI(heightCm, weightKg){
  if(!heightCm || !weightKg) return null;
  const heightM = heightCm/100;
  const bmi = weightKg / (heightM * heightM);
  return Number(bmi.toFixed(1));
}