import React, {useState, useEffect} from 'react';
import {Keyboard, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';
import api from '../../services/api';
import Proptypes from 'prop-types';
export default function Main({navigation}) {
  const [Users, setUsers] = useState([]);
  const [UserField, setUserField] = useState('');
  const [IsLoading, setIsLoading] = useState(false);

  async function getData() {
    const users = await AsyncStorage.getItem('users');
    if (users) {
      setUsers(JSON.parse(users));
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function handleSubmit() {
    setIsLoading(true);
    Keyboard.dismiss();
    const {user} = UserField;
    const response = await api.get(`/users/${user}`);
    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };
    setUsers([...Users, data]);
    await AsyncStorage.setItem('users', JSON.stringify([...Users, data]));
    setUserField('');
    setIsLoading(false);
  }
  function handleNavigate(user) {
    navigation.navigate('User', {user});
  }
  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Usuário Github"
          value={UserField}
          onChangeText={(e) => setUserField({user: e})}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />
        <SubmitButton
          loading={IsLoading}
          onPress={handleSubmit}
          enabled={!IsLoading}>
          {IsLoading ? (
            <ActivityIndicator color="#fff " />
          ) : (
            <Icon name="add" size={20} color="#fff" />
          )}
        </SubmitButton>
      </Form>
      <List
        showsVerticalScrollIndicator={false}
        data={Users}
        keyExtractor={(user) => user.login}
        renderItem={({item}) => (
          <User>
            <Avatar source={{uri: item.avatar}} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ProfileButton onPress={() => handleNavigate(item)}>
              <ProfileButtonText>Ver perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}
