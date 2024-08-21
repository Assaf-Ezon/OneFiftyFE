import { View, Image, Text, Pressable } from 'react-native';
import StartScreenStyle from './start_style';
import { IMAGES } from '../../image_handler';

const StartScreen = ({ navigation }: {navigation: any}) => {
    return(
      <View style={StartScreenStyle.container}>
        <View style={StartScreenStyle.image}>
            <Image source={IMAGES.start_screen} />       
        </View>
        <View style={StartScreenStyle.textContainer}>
            <Text style={StartScreenStyle.title}>
                150 - לומדת פסיכומטרי{'\n'}
                למד מילים בכל מקום
            </Text>
            <Text style={StartScreenStyle.paragraph}>
                150 הינו כלי ללימוד מילים בעברית ובאנגלית כחלק מהכנה{'\n'}
                למבחן הפסיכומטרי. מגוון משחקונים ולומדות לצורך שינון{'\n'}
                ולמידה של מילים חדשות.
            </Text>
            <View style={StartScreenStyle.btnContainer}>
                <Pressable style={StartScreenStyle.btn} onPress={() => {navigation.replace('signup')}}>
                    <Text style={StartScreenStyle.btnText}>בואו נתחיל</Text>            
                </Pressable>
            </View>
        </View>
      </View>
    );
};

export default StartScreen;