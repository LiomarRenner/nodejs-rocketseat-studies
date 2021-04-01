import React from 'react';
import {Text, View, StyleSheet} from 'react-native'

const Header = () => {
	return (
    <View styles={styles.viewStyle}>
		  <Text styles={styles.textStyle}>Cabeçalho</Text>
    </View>  
	);
};

export default Header;

const styles = StyleSheet.create ({
  textStyle:{
    fontSize: 20
  },
  viewStyle:{
    justifyContent:'center',
    alignItems:'center',
    height:60,
    paddingTop:15,
    backgroundColor:'#f2f2f2',
    shadowColor:'#000',
    shadowOffset:{
      height:2,
      width: 0
    },
    shadowOpacity:0.2
  }

});