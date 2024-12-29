import KdkStyle from './kdk_style';

import KDKGamePage from '../../components/kdk/kdk_game_page/kdk_game_page';
import { EndGameProvider } from '../../context/game_context/end_game_context';
import { LeaveGameProvider } from '../../context/game_context/leave_game_context';

const KdkPage = ({ navigation }: {navigation: any}) => {
    return (
        <EndGameProvider>
            <LeaveGameProvider>
                <KDKGamePage />
            </LeaveGameProvider>
        </EndGameProvider>
    );
};

export default KdkPage;