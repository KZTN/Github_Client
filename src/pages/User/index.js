import React, {useEffect, useState} from 'react';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  StarList,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default function User({navigation}) {
  User.navigationOptions = {
    title: navigation.state.params.user.name,
  };
  const [Stars, setStars] = useState([]);
  async function getData() {
    await api
      .get(`/users/${navigation.state.params.user.login}/starred`)
      .then((response) => {
        setStars(response.data);
      })
      .catch((error) => {
        console.tron.log(error);
      });
  }
  useEffect(() => {
    getData();
  });

  return (
    <Container>
      <Header>
        <Avatar source={{uri: navigation.state.params.user.avatar}} />
        <Name>{navigation.state.params.user.name}</Name>
        <Bio>{navigation.state.params.user.bio}</Bio>
      </Header>

      <StarList
        showsVerticalScrollIndicator={false}
        data={Stars}
        keyExtractor={(star) => String(star.id)}
        renderItem={({item}) => (
          <Starred>
            <OwnerAvatar source={{uri: item.owner.avatar_url}} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
          </Starred>
        )}
      />
    </Container>
  );
}
