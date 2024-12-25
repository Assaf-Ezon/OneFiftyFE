import KdkStyle from './kdk_style';

import KDKGamePage from '../../components/kdk/KDKGamePage/KDKGamePage';
import { EndGameProvider } from '../../context/game_context/end_game_context';

const KdkPage = ({ navigation }: {navigation: any}) => {
    return (
        <EndGameProvider>
            <KDKGamePage />
        </EndGameProvider>
    );
};

export default KdkPage;