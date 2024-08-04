import React, { useState } from 'react';
import { View, Image, Text, Pressable, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from 'expo-checkbox'

import SignupScreenStyle from './signup_style';

const SignupScreen = ({ navigation }: {navigation: any}) => {
    const [isSelected, setSelection] = useState(false);

    return(
      <View style={SignupScreenStyle.container}>
        <View style={SignupScreenStyle.blank}></View>
        <View style={SignupScreenStyle.signupContainer}>
            <View style={SignupScreenStyle.title}>
                <Image style={SignupScreenStyle.logoImage} source={require('../../../assets/login icons/small_logo.png')} />
                <View>
                    <Text style={SignupScreenStyle.mainTitle}>יצירת משתמש</Text>
                    <Text style={SignupScreenStyle.secondTitle}>מלא את הפרטים מטה על מנת להשתמש בלומדה</Text>
                </View>
            </View>
            <View style={SignupScreenStyle.fields}>
                <TextInput
                    style={SignupScreenStyle.inputField}
                    placeholder='שם משתמש'
                    keyboardType='default'
                />
                <TextInput
                    style={SignupScreenStyle.inputField}
                    placeholder='אימייל'
                    keyboardType='email-address'
                />
                <TextInput
                    style={SignupScreenStyle.inputField}
                    placeholder='סיסמא'
                    keyboardType='default'
                    secureTextEntry={true} 
                />
                <TextInput
                    style={SignupScreenStyle.inputField}
                    placeholder= 'תאריך לידה'
                />
                <TextInput
                    style={SignupScreenStyle.inputField}
                    placeholder= 'תאריך בחינה'
                />
                <View style={SignupScreenStyle.checkboxContainer}>
                    <Text style={SignupScreenStyle.checkboxText}>אני מסכים לתנאי השימוש</Text>
                    <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={SignupScreenStyle.checkbox}
                    />
                </View>
            </View>
            <View style={SignupScreenStyle.submitBtnContainer}>
                <Pressable style={SignupScreenStyle.submitBtn}>
                    <Text style={SignupScreenStyle.submitText}>הירשם</Text>
                </Pressable>
            </View>
        </View>
        <View style={SignupScreenStyle.alreadySignedContainer}>
            <TouchableOpacity onPress={() => {navigation.replace('login')}}><Text style={SignupScreenStyle.goToSignInText}> התחבר</Text></TouchableOpacity >
            <Text style={SignupScreenStyle.alreadySignedText}>כבר יש משתמש קיים?</Text>
        </View>
      </View>
    );
};

export default SignupScreen;