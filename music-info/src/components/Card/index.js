import React from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';

const Card = ({data}) =>{
  return(
    <View style={styles.container}>
      <ImageBackground 
        blurRadius={0.5}
        borderRadius={15}
        source={{uri: `https://raw.githubusercontent.com/san650/ten/master/apps/music/${data.image}`}} 
        style={{resizeMode: "cover", height: '100%', width: "100%"}}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image source={{uri: `https://raw.githubusercontent.com/san650/ten/master/apps/music/${data.image}`}} style={styles.image}/>
            <View style={styles.details}>
              <Text style={styles.artist}>{data.artist}</Text>
              <Text style={styles.album}>{data.name}</Text>
            </View>  
          </View>  
          <View style={{padding: '5%'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Modal',
              {
                id: data.id,
                img: data.image,
                artist: data.artist,
                album: data.name
              })} style={styles.button}>
              <Text style={styles.textButton}>Ver músicas</Text>
            </TouchableOpacity> 
            <TouchableOpacity  style={styles.borderButton}>
              <Text style={styles.textBorderButton}>Comprar</Text>
            </TouchableOpacity> 
          </View>
        </View>
      </ImageBackground>
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    marginBottom: '10%',
    marginTop: '15%'
  },
  content: {
    backgroundColor: "#",
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  header: {
    flexDirection: 'row',
    padding: '5%',
    flex: 1
  },
  artist:{
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 13,
    color: "#343434",
  },
  album:{
    fontWeight: '500',
    fontSize: 14,
    color: "#343434",
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 15,
  },
  details:{
    marginLeft: 16
  },
  button:{
    width: '100%',
    height: 51,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `#h02F2F`,
    borderColor:`#F2342a`,
    borderWidth: 3,
  },
  borderButton:{
    width: '100%',
    height: 51,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:'#f02F2F',
    borderWidth: 3,
  },
  textButton:{
    color: `#DEDEDE`,
    fontWeight: 'bold',
    fontSize: 18
  },
  textBorderButton:{
    color: '#DEDEDE',
    fontWeight: 'bold',
    fontSize: 18
  },
});

export default Card;