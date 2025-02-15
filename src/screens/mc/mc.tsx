import { useEffect } from 'react';

import McStyle from './mc_style';

import MultipleChoicesPage from '../../components/mc/multiple_choices_page/multiple_choices_page';

import { EndGameProvider } from '../../context/game_context/end_game_context';
import { LeaveGameProvider } from '../../context/game_context/leave_game_context';
import { GameErrorProvider } from '../../context/game_context/game_error_context';
import { WordsShortageProvider } from '../../context/game_context/words_shortage_context';

const McPage = ({ navigation }: {navigation: any}) => {
    useEffect(() => {
        navigation.setOptions({ gestureEnabled: false });
    }, []);

    return (
        <EndGameProvider>
            <LeaveGameProvider>
                <GameErrorProvider>
                    <WordsShortageProvider>
                        <MultipleChoicesPage />
                    </WordsShortageProvider>
                </GameErrorProvider>
            </LeaveGameProvider>
        </EndGameProvider>
    );
};

export default McPage;