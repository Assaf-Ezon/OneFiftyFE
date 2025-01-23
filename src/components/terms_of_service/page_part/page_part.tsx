import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { IMAGES } from '../../../image_handler';
import { CONFIG } from '../../../config';

import PagePartStyle from './page_part_style';

const PagePart = () => {
    const navigation = useNavigation();

    const [isTerms, setIsTerms] = useState<boolean>(true);
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        if (isTerms) {
            setContent(CONFIG.terms_of_service);
        } else {
            setContent(CONFIG.privacy_policy);
        }
    }, [isTerms]);

    return (
        <View style={PagePartStyle.container}>
            <View style={PagePartStyle.topPart}>
                <View style={PagePartStyle.topPartText}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Image source={IMAGES.back_icon} />
                    </TouchableOpacity>
                    <Text style={PagePartStyle.pageTitle} allowFontScaling={false}>תנאי שימוש</Text>
                </View>
            </View>
            <View style={PagePartStyle.SwitchContainer}>
                <TouchableOpacity style={[{backgroundColor: isTerms ? 'white' : '#FAF0E6'}, PagePartStyle.LeftSwitchBtn]} onPress={() => {setIsTerms(prev => !prev)}}>
                    <Text style={PagePartStyle.SwitchText} allowFontScaling={false}>מדיניות פרטיות</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{backgroundColor: isTerms ? '#FAF0E6' : 'white'}, PagePartStyle.RightSwitchBtn]} onPress={() => {setIsTerms(prev => !prev)}}>
                    <Text style={PagePartStyle.SwitchText} allowFontScaling={false}>תנאי שימוש</Text>
                </TouchableOpacity>
            </View>
            <View style={PagePartStyle.ScrollviewContainer}>
                <ScrollView contentContainerStyle={PagePartStyle.documents}
                            showsVerticalScrollIndicator={false}>
                    <Text style={PagePartStyle.DocumentTitle} allowFontScaling={false}>
                        {
                            isTerms ? 'תנאי שירות (Terms of Service)' : 'מדיניות פרטיות (Privacy Policy)'
                        }
                    </Text>
                    <Text style={PagePartStyle.content} allowFontScaling={false}>{content}</Text>
                    <View style={PagePartStyle.blank} />
                </ScrollView>
            </View>
        </View>
    );
};

export default PagePart;