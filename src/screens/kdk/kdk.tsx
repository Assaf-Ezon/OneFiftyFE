import KdkStyle from './kdk_style';

import KDKGamePage from '../../components/kdk/kdk_game_page/kdk_game_page';
import { EndGameProvider } from '../../context/game_context/end_game_context';
import { LeaveGameProvider } from '../../context/game_context/leave_game_context';
import { GameErrorProvider } from '../../context/game_context/game_error_context';
import { WordsShortageProvider } from '../../context/game_context/words_shortage_context';

const KdkPage = ({ navigation }: {navigation: any}) => {
    return (
        <EndGameProvider>
            <LeaveGameProvider>
                <GameErrorProvider>
                    <WordsShortageProvider>
                        <KDKGamePage />
                    </WordsShortageProvider>
                </GameErrorProvider>
            </LeaveGameProvider>
        </EndGameProvider>
    );
};

export default KdkPage;