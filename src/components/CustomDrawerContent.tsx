import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import styled from 'styled-components/native';

const DrawerContainer = styled.View`
  padding-top: 40px;
  background-color: #fff;
  flex: 1;
`;

const DrawerItem = styled.View`
  padding: 10px;
`;

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  console.log('Drawer routes:', props.state.routes.map((route) => route.name));
  return (
    <DrawerContainer>
      <DrawerContentScrollView {...props}>
        <DrawerItem>
          <DrawerItemList {...props} />
        </DrawerItem>
      </DrawerContentScrollView>
    </DrawerContainer>
  );
};

export default CustomDrawerContent;
