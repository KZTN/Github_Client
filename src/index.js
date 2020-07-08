import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import './config/ReactotronConfig';
console.tron.log('ok');
import Routes from './routes';

export default function App() {
  return <Routes />;
}
