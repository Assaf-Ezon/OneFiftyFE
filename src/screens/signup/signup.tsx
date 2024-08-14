import React, { useState } from 'react';
import { View, Image, Text, Pressable, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from 'expo-checkbox'
import { IMAGES } from '../../iamge_handler';
import SignupScreenStyle from './signup_style';

const SignupScreen = ({ navigation }: {navigation: any}) => {
    const [isSelected, setSelection] = useState(false);
    const [date, setDate] = useState(new Date());

    return(
      <View style={SignupScreenStyle.container}>
        <View style={SignupScreenStyle.blank}></View>
        <View style={SignupScreenStyle.signupContainer}>
            <View style={SignupScreenStyle.title}>
                <Image style={SignupScreenStyle.logoImage} source={IMAGES.small_logo} />
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
                <View style={SignupScreenStyle.dateInputContainer}>
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                    />
                    <Text style={SignupScreenStyle.dateInputText}>תאריך לידה:</Text>
                </View>
                <View style={SignupScreenStyle.dateInputContainer}>
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                    />
                    <Text style={SignupScreenStyle.dateInputText}>תאריך בחינה:</Text>
                </View>
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
            <TouchableOpacity onPress={() => {navigation.replace('login')}}><Text style={SignupScreenStyle.goToSignInText}> התחבר</Text></TouchableOpacity>
            <Text style={SignupScreenStyle.alreadySignedText}>כבר יש משתמש קיים?</Text>
        </View>
      </View>
    );
};

export default SignupScreen;