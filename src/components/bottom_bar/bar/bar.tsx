import { View, ImageSourcePropType } from 'react-native';
import { FC } from 'react';

import barStyle from './bar_style';

import BottomBarIcon from '../icon/icon';

import { useSidebarContext } from '../../../context/general_context/sidebar_context';

interface bottomBarProp {
    activeScreen: string;
    homePath: ImageSourcePropType;
    dictionaryPath: ImageSourcePropType;
    learningPath: ImageSourcePropType;
    leaderboardPath: ImageSourcePropType;
    profilePath: ImageSourcePropType;
};

const BottomBar: FC<bottomBarProp> = ({ homePath, dictionaryPath, learningPath, leaderboardPath, profilePath, activeScreen }) => {
    const {isOpen} = useSidebarContext();
    
    return (
        <View pointerEvents={ isOpen ? 'none' : 'auto' } style={[{opacity: isOpen ? 0.2 : 1}, barStyle.container]}>
            <BottomBarIcon iconPath={profilePath} iconText='משתמש' activeScreen={activeScreen == "profile" ? true : false} screenName='profile' />
            <BottomBarIcon iconPath={leaderboardPath} iconText='מובילים' activeScreen={activeScreen == "leaderboard" ? true : false} screenName='leaderboard' />
            <BottomBarIcon iconPath={learningPath} iconText='למידה' activeScreen={activeScreen == "learning" ? true : false} screenName='learning' />
            <BottomBarIcon iconPath={dictionaryPath} iconText='מילון' activeScreen={activeScreen == "dictionary" ? true : false} screenName='dictionary' />
            <BottomBarIcon iconPath={homePath} iconText='בית' activeScreen={activeScreen == "home" ? true : false} screenName='home' />
        </View>
    );
};

export default BottomBar;