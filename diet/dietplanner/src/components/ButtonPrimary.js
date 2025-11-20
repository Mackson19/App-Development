import React from 'react';
import { Button } from 'react-native-paper';

export default function ButtonPrimary({ title, onPress, loading }){
  return (
    <Button mode="contained" onPress={onPress} loading={loading} style={{ marginVertical: 10 }}>
      {title}
    </Button>
  );
}