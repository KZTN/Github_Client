import React, {useState} from 'react';
import {Keyboard, ActivityIndicator} from 'react-native';
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

export default function Main() {
  const [Users, setUsers] = useState([]);
  const [UserField, setUserField] = useState('');
  const [IsLoading, setIsLoading] = useState(false);

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
    console.tron.log(data);
    setUsers([...Users, data]);
    setUserField('');
    setIsLoading(false);
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
            <ProfileButton onPress={() => {}}>
              <ProfileButtonText>Ver perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Olá mundo',
};
