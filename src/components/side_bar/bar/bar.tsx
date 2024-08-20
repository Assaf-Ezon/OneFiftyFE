import { View, Text } from 'react-native';
import { FC, useState } from 'react';
import barStyle from './bar_style';
import SideBarIcon from '../icon/icon';
import { useSidebarContext } from '../../../context/general_context/sidebar_context';

const SideBar: FC = ({  }) => {
    const {isOpen, setIsOpen} = useSidebarContext();

    return (
        <View style={[barStyle.container, {display: isOpen ? 'flex' : 'none'}]}>
            <Text>Hello world</Text>
        </View>
    );
};

export default SideBar;