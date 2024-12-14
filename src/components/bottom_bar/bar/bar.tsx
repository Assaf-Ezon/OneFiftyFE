import { View, ImageSourcePropType } from 'react-native';
import { FC } from 'react';

import barStyle from './bar_style';

import BottomBarIcon from '../icon/icon';
import { Screens } from '../../../screen_names';

import { useSidebarContext } from '../../../context/general_context/sidebar_context';
import { useLearningSettingsContext } from '../../../context/settings_context/learning_context';
import { useProfileImageMenuContext } from '../../../context/settings_context/profile_image_context';

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
    const {isLearningSettingOpen} = useLearningSettingsContext();
    const {isProfileImageMenuOpen} = useProfileImageMenuContext();

    return (
        <View pointerEvents={ isOpen || isLearningSettingOpen || isProfileImageMenuOpen ? 'none' : 'auto' } style={[{opacity: isOpen || isLearningSettingOpen || isProfileImageMenuOpen ? 0.2 : 1}, barStyle.container]}>
            <BottomBarIcon iconPath={profilePath} iconText='משתמש' activeScreen={activeScreen == Screens.PROFILE ? true : false} screenName={Screens.PROFILE} />
            <BottomBarIcon iconPath={leaderboardPath} iconText='מובילים' activeScreen={activeScreen == Screens.LEADERBOARD ? true : false} screenName={Screens.LEADERBOARD} />
            <BottomBarIcon iconPath={learningPath} iconText='למידה' activeScreen={activeScreen == Screens.LEARNING ? true : false} screenName={Screens.LEARNING} />
            <BottomBarIcon iconPath={dictionaryPath} iconText='מילון' activeScreen={activeScreen == Screens.DICTIONARY ? true : false} screenName={Screens.DICTIONARY} />
            <BottomBarIcon iconPath={homePath} iconText='בית' activeScreen={activeScreen == Screens.HOME ? true : false} screenName={Screens.HOME} />
        </View>
    );
};

export default BottomBar;