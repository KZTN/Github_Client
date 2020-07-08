import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Form, Input, SubmitButton} from './styles';
import api from '../../services/api';

export default function Main() {
  const [Users, setUsers] = useState([]);
  const [UserField, setUserField] = useState('');

  async function handleSubmit() {
    Keyboard.dismiss();
    const {user} = UserField;
    const response = await api.get(`/users/${user}`);
    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };
    console.tron.log(UserField);
    setUsers(...Users, data);
    setUserField('');
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
        <SubmitButton onPress={handleSubmit}>
          <Icon name="add" size={20} color="#fff" />
        </SubmitButton>
      </Form>
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Olá mundo',
};
