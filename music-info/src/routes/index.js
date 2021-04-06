import React from 'react';
import {SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AlbumList from '../screens/AlbumList';
import Header from '../screens/Header';

const Routes = (
  createStackNavigator({
    Header: Header,
    AlbumList: AlbumList,
  })
);

export default Routes;