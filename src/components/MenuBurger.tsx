import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type RootDrawerParamList = {
  Home: undefined;
  Contact: undefined;
};
type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;

const Button = styled.TouchableOpacity`
  padding: 16px;
`;

const MenuBurger: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Button
      onPress={() => navigation.openDrawer()}
      accessibilityLabel="Ouvrir le menu de navigation"
    >
      <Icon name="menu" size={24} color="#333" />
    </Button>
  );
};

export default MenuBurger;
