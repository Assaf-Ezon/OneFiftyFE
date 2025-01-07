import { useEffect } from 'react';

import McStyle from './mc_style';

import PagePart from '../../components/mc/page_part/page_part';

import { EndGameProvider } from '../../context/game_context/end_game_context';
import { LeaveGameProvider } from '../../context/game_context/leave_game_context';
import { GameErrorProvider } from '../../context/game_context/game_error_context';

const McPage = ({ navigation }: {navigation: any}) => {
    useEffect(() => {
        navigation.setOptions({ gestureEnabled: false });
    }, []);

    return (
        <EndGameProvider>
            <LeaveGameProvider>
                <GameErrorProvider>
                        <PagePart />
                </GameErrorProvider>
            </LeaveGameProvider>
        </EndGameProvider>
    );
};

export default McPage;