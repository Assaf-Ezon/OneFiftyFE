import React, { useState } from 'react';
import { View, Image, Text, Pressable, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from 'expo-checkbox'
import { IMAGES } from '../../iamge_handler';
import SignupScreenStyle from './signup_style';
import signup_request from './signup_request'

const SignupScreen = ({ navigation }: {navigation: any}) => {
    const [signupFailed, setSignupFailed] = useState<boolean>(false);

    const [isSelected, setSelection] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setpassword] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date('2000-01-01'));
    const [dateOfExam, setDateOfExam] = useState<Date>(new Date('2024-08-15'));

    const changeBirth = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || dateOfBirth;
        setDateOfBirth(currentDate);
    };
    const changeExam = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || dateOfBirth;
        setDateOfExam(currentDate);
    };

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
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={SignupScreenStyle.inputField}
                    placeholder='אימייל'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={SignupScreenStyle.inputField}
                    placeholder='סיסמא'
                    keyboardType='default'
                    value={password}
                    onChangeText={setpassword}
                    secureTextEntry={true} 
                />
                <View style={SignupScreenStyle.dateInputContainer}>
                    <DateTimePicker
                        value={dateOfBirth}
                        mode="date"
                        display="default"
                        onChange={changeBirth}
                    />
                    <Text style={SignupScreenStyle.dateInputText}>תאריך לידה:</Text>
                </View>
                <View style={SignupScreenStyle.dateInputContainer}>
                    <DateTimePicker
                        value={dateOfExam}
                        mode="date"
                        display="default"
                        onChange={changeExam}
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
                <Pressable style={SignupScreenStyle.submitBtn} onPress={() => signup_request(navigation, setSignupFailed, email, password, name)}>
                    <Text style={SignupScreenStyle.submitText}>הירשם</Text>
                </Pressable>
                {signupFailed && (
                    <Text style={SignupScreenStyle.faliedText}>הרשמה נכשלה</Text>
                )}
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