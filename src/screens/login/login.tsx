import React, { useState, FC } from 'react';
import { View, Image, Text, Pressable, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox';
import LoginScreenStyle from './login_style';
import { IMAGES } from '../../image_handler';
import { Screens } from '../../screen_names';

const LoginScreen = ({ navigation }: {navigation: any}) => {
    const [isSelected, setSelection] = useState(false);

    return(
      <View style={LoginScreenStyle.container}>
        <View style={LoginScreenStyle.blank}></View>
        <View style={LoginScreenStyle.signupContainer}>
            <View style={LoginScreenStyle.title}>
                <Image style={LoginScreenStyle.logoImage} source={IMAGES.small_logo} />
                <View>
                    <Text style={LoginScreenStyle.mainTitle}>התחברות</Text>
                    <Text style={LoginScreenStyle.secondTitle}>מלא את הפרטים מטה על מנת להשתמש בלומדה</Text>
                </View>
            </View>
            <View style={LoginScreenStyle.fields}>
                <TextInput
                    style={LoginScreenStyle.inputField}
                    placeholder='אימייל'
                    keyboardType='email-address'
                />
                <TextInput
                    style={LoginScreenStyle.inputField}
                    placeholder='סיסמא'
                    keyboardType='default'
                    secureTextEntry={true} 
                />
                <View style={LoginScreenStyle.checkboxContainer}>
                    <Text style={LoginScreenStyle.checkboxText}>זכור אותי</Text>
                    <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={LoginScreenStyle.checkbox}
                    />
                </View>
            </View>
            <View style={LoginScreenStyle.submitBtnContainer}>
                <Pressable style={LoginScreenStyle.submitBtn} onPress={() => {navigation.replace(Screens.HOME)}}>
                    <Text style={LoginScreenStyle.submitText}>התחבר</Text>
                </Pressable>
                <TouchableOpacity onPress={() => {navigation.replace(Screens.FORGOT_PASSWORD)}}><Text style={LoginScreenStyle.forgotPasswordText}>שכחתי סיסמא</Text></TouchableOpacity>
            </View>
        </View>
        <View style={LoginScreenStyle.alreadySignedContainer}>
            <TouchableOpacity onPress={() => {navigation.replace(Screens.SIGNUP)}}><Text style={LoginScreenStyle.goToSignInText}>  צור משתמש</Text></TouchableOpacity >
            <Text style={LoginScreenStyle.alreadySignedText}>אין משתמש?</Text>
        </View>
      </View>
    );
};

export default LoginScreen;