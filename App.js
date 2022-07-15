import React, { useEffect, useState} from 'react';
import { FlatList, Text, View,StyleSheet,Modal,Pressable,TextInput,ScrollView } from 'react-native';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modl, setModl] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  // console.log(data);

  /////////////////////////////////////////

  const adduser = () =>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Sunena' })
  };
  fetch('https://62cd12fda43bf780085130a2.mockapi.io/get-news/users', requestOptions)
      .then(response => response.json())
      .then(data => setPostId(data.id));
  }
  //////////////////////////////////////////////
  const update = (id) =>{
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Sunena' })
  };
  fetch('https://62cd12fda43bf780085130a2.mockapi.io/get-news/users'+`/${id}`, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }


 ////////////////////////////////////////

  const deleted = (id) =>{
    console.log(id);
    const requestOptions = {
      method: 'DELETE',
      headers: { 
          'Authorization': 'Bearer my-token',
          'My-Custom-Header': 'foobar'
      }
  };
  fetch('https://62cd12fda43bf780085130a2.mockapi.io/get-news/users'+`/${id}`, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  //////////////////////////////////////////////////

useEffect(() => {
  fetch('https://62cd12fda43bf780085130a2.mockapi.io/get-news/users')
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, []);



  return (
    <ScrollView style={{backgroundColor:'#faedcd'}}>
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <Text>Loading...</Text> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
          <Text style={{ fontSize: 18, textAlign: 'center',fontWeight:'500'}}>{data.name}</Text>
          <Text style={{ fontSize: 30,fontWeight:'900', color: '#d4a373', textAlign: 'center', paddingBottom: 10}}>Users:</Text>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View
               style={{flexDirection:'row',justifyContent:'space-between',margin:5}}>
                <Text onPress={() =>{ 
                  update(item.id)
                  setModl(true)}}>{item.id + '. ' + item.name}</Text>
               <Text  onPress={() => deleted(item.id)}style={{fontSize:18,fontWeight:'500'}} > delete </Text>
              </View>
            )}
          />
        </View>
      )}



      
    <Modal
        animationType="slide"
        transparent={true}
        visible={modl}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModl(!modl);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput
        style={styles.input}
        placeholder="id"
      />
        <TextInput
        style={styles.input}
        placeholder="name"
      />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModl(!modl)}
            >
              <Text
              style={styles.textStyle}>Update user </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput
        style={styles.input}
        placeholder="id"
      />
        <TextInput
        style={styles.input}
        placeholder="name"
      />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text
              onPress={adduser} 
              style={styles.textStyle}>Add user </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        <View style={{alignItems:'center',backgroundColor:'#d4a373',height:30,width:100,justifyContent:'center',borderRadius:7}}>
      <Text style={{fontSize:15,fontWeight:'600',color:'white'}}  onPress={() => setModalVisible(true)}> Add User </Text>
      </View>
    </View>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    height: 40,
    margin: 12,
    borderLeftWidth:0,
    padding: 10,
    borderWidth:1,
    borderRightWidth:0,
    borderTopWidth:0,
    width:300
  },
})