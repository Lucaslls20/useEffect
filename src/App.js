import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const App = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/');
      const result = await response.json();
      setData(result.results[0]);
    } catch (err) {
      console.log('Something is wrong', err);
      Alert.alert('Something is wrong', err.toString());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderizar = () => {
    setLoading(true);
    fetchData();
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={30} color='#0000ff' />
        <Text>Carregando...</Text>
        <Text>Aguarde um instante</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data && (
        <>
          <Text style={styles.text}>{data.location.country}</Text>
          <Text style={styles.text}>{data.location.state}</Text>
          <Text style={styles.text}>{data.location.city}</Text>
          <Text style={styles.text}>{data.name.first} {data.name.last}</Text>
          <Text style={styles.text}>{data.email}</Text>
        </>
      )}
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} onPress={renderizar}>
          <Text style={{ color: '#FFF' }}>Pressiona-me para renderizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 6
  },
  viewButton: {
    padding: 6,
    width: '90%',
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
    fontWeight: 'bold'
  }
});

export default App;
