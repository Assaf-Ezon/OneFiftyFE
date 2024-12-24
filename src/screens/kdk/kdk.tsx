import KdkStyle from './kdk_style';

import PagePart from '../../components/kdk/page_part/page_part';
import { EndGameProvider } from '../../context/game_context/end_game_context';

const KdkPage = ({ navigation }: {navigation: any}) => {
    return (
        <EndGameProvider>
            <PagePart />
        </EndGameProvider>
    );
};

export default KdkPage;