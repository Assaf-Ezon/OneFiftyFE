import { View, Text, TouchableOpacity, Image, TextInput, Animated } from "react-native";
import { useEffect, useState } from "react";

import { IMAGES } from "../../image_handler";
import { fadeIn } from "../../animations/fade_animations";

import ContactFormStyle from './contact_form_style';

import { useContactUsFormContext } from "../../context/general_context/contact_form_context";
import { useNavigation } from "@react-navigation/native";

const ContactForm = () => {
    const navigation = useNavigation();
    
    const {isContactFormOpen, toggleOpenContactUsForm} = useContactUsFormContext();

    const [problemTitle, setProblemTitle] = useState<string>('');
    const [problemBody, setProblemBody] = useState<string>('');
    
    // animation
    const fadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];

    useEffect(() => {
        if (isContactFormOpen) {
            fadeIn(fadeAnim, 1, 100, true).start();
        }
    }, [isContactFormOpen, fadeAnim]);

    // sets swipe right to go back disabled when popup is open
    useEffect(() => {
        setProblemTitle('');
        setProblemBody('');
        navigation.setOptions({
          gestureEnabled: !isContactFormOpen,
        });
      }, [isContactFormOpen]);

      const sendEmail = () => {
        // send email logic here
        toggleOpenContactUsForm();
      };

    return (
        <Animated.View style={[{display: isContactFormOpen ? 'flex' : 'none', opacity: fadeAnim}, ContactFormStyle.container]}>
            <View style={ContactFormStyle.titleContainer}>
                <TouchableOpacity onPress={() => {toggleOpenContactUsForm()}}>
                    <Image source={IMAGES.back_icon} />
                </TouchableOpacity>
                <Text style={ContactFormStyle.title}>דווח על בעיה</Text>
            </View>
            <View style={ContactFormStyle.inputFieldsContainer}>
            <TextInput
                style={ContactFormStyle.titleInputField}
                placeholder='כותרת הבעיה'
                keyboardType='default'
                value={problemTitle}
                onChangeText={setProblemTitle}
                blurOnSubmit={true} 
            />
            <TextInput
                style={ContactFormStyle.bodyInputField}
                placeholder='פירוט הבעיה'
                keyboardType='default'
                multiline={true}
                value={problemBody}
                onChangeText={setProblemBody}
                blurOnSubmit={true} 
            />
            </View>
            <View style={ContactFormStyle.submitBtnContainer}>
                <TouchableOpacity style={ContactFormStyle.submitBtn} onPress={() => {sendEmail()}}>
                        <Text style={ContactFormStyle.submitBtnText}>אישור</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default ContactForm;