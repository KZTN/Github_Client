import React from 'react';
import {Text} from 'react-native';

// import { Container } from './styles';

export default function User({navigation}) {
  console.tron.log(navigation.state.params.user);
  return <Text>User</Text>;
}
