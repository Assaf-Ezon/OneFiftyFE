import React, { useState } from 'react';
import { View, Image, Text, Pressable, TextInput, TouchableOpacity } from 'react-native';
import forgotPasswordScreenStyle from './forgot_password_style';
import { IMAGES } from '../../image_handler';

const ForgotPasswordScreen = ({ navigation }: {navigation: any}) => {
    const [isSelected, setSelection] = useState(false);

    return(
      <View style={forgotPasswordScreenStyle.container}>
        <View style={forgotPasswordScreenStyle.blank}></View>
        <View style={forgotPasswordScreenStyle.signupContainer}>
            <View style={forgotPasswordScreenStyle.title}>
                <Image style={forgotPasswordScreenStyle.logoImage} source={IMAGES.small_logo} />
                <View>
                    <Text style={forgotPasswordScreenStyle.mainTitle}>שכחתי סיסמא</Text>
                    <Text style={forgotPasswordScreenStyle.secondTitle}>איפוס סיסמא למשתמש</Text>
                </View>
            </View>
            <View style={forgotPasswordScreenStyle.fields}>
                <TextInput
                    style={forgotPasswordScreenStyle.inputField}
                    placeholder='שם נעורים של אמך'
                    keyboardType='email-address'
                />
                <TextInput
                    style={forgotPasswordScreenStyle.inputField}
                    placeholder='סיסמא חדשה'
                    keyboardType='default'
                    secureTextEntry={true} 
                />
                <TextInput
                    style={forgotPasswordScreenStyle.inputField}
                    placeholder='חזור על סיסמא חדשה'
                    keyboardType='default'
                    secureTextEntry={true} 
                />
            </View>
            <View style={forgotPasswordScreenStyle.submitBtnContainer}>
                <Pressable style={forgotPasswordScreenStyle.submitBtn}>
                    <Text style={forgotPasswordScreenStyle.submitText}>שנה סיסמא</Text>
                </Pressable>
                <TouchableOpacity onPress={() => {navigation.replace('login')}}><Text style={forgotPasswordScreenStyle.backToLogin}>חזור להתחברות</Text></TouchableOpacity>
            </View>
        </View>
        <View style={forgotPasswordScreenStyle.bottomBlank}></View>
      </View>
    );
};

export default ForgotPasswordScreen;