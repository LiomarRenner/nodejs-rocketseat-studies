import React, {useEffect, useState} from 'react';

import {View, Text,ActivityIndicator, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Card from '../../components/Card/index';
import api from "../../services/api";

const AlbumList = () => {
  const [albums, setAlbums] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAlbum = async () => {
      const {data} = await api.get('/albums.json');
      setAlbums(data.albums);
      setLoading(true);
    }
    loadAlbum();
  },[]);
  

	return (
    <>
      <SafeAreaView style={styles.container} >
      <ScrollView style={{width: "90%"}} 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {loading ? 
        albums && albums.map((album) => 
          <Card data={album} key={album.id}/>
        )
      : (
          <ActivityIndicator color="#fff" style={{marginTop: '100%'}}/>
        )}
      </ScrollView>
      </SafeAreaView>
    </> 
	);
};

export default AlbumList;

const styles = StyleSheet.create ({
  container: {
   width: '100%',
   alignItems: 'center',
   justifyContent: 'center',
   flex: 1,
  },
  content:{
    width: '90%',
    borderRadius: 15,
    padding: "5%",
    backgroundColor: "#DEDEDE",
  },
});