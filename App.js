import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import Loader from './Loader';

export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
     const response = await fetch('http://sangita.iosx.in:9000/api/user-search',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: {
       "keyword": ""
      }
     });
     const json = await response.json();
     setData(json.data);
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
  }
  
  useEffect(()=>{
  loadData();
  },[]);

  const DATA = data;
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item title={item.name} />
  );

  return (
   
    <SafeAreaView style={styles.container}>
       <View >
      <Text style={styles.text}>
        This is my first react native app
      </Text>
      <Text></Text>
      </View>
     
      {isLoading && <Loader/>}
   {!isLoading && <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item._id}
    />}
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 90,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  text: {
    fontSize: 23,
    justifyContent: 'center',
  },
});