import { View, ScrollView } from 'react-native';
import Plan from './plan/plan';

import PlansContainerStyle from './page_part_style';

import { Plans } from '../../payment_plans';

const PlansContainer = () => {
    return (
        <View style={PlansContainerStyle.mainPage}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Plan name={Plans.OneMonth.Name} title={Plans.OneMonth.Title} description={Plans.OneMonth.Description} price={Plans.OneMonth.Price} />
                <Plan name={Plans.TwoMonths.Name} title={Plans.TwoMonths.Title} description={Plans.TwoMonths.Description} price={Plans.TwoMonths.Price} />
                <Plan name={Plans.ThreeMonts.Name} title={Plans.ThreeMonts.Title} description={Plans.ThreeMonts.Description} price={Plans.ThreeMonts.Price} />
                <View style={PlansContainerStyle.blank} />
            </ScrollView>
        </View>
    );
};

export default PlansContainer;