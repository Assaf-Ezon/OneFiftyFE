import { View, Text, TouchableOpacity, Image, TextInput, Animated, Dimensions, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useEffect, useRef, useState } from "react";

import { IMAGES } from "../../image_handler";

import ContactFormStyle from './contact_form_style';

import { useContactUsFormContext } from "../../context/general_context/contact_form_context";
import { useNavigation } from "@react-navigation/native";
import { SlideIn } from "../../animations/slide_animation";

const { height } = Dimensions.get('window');

const ContactForm = () => {
    const navigation = useNavigation();

    const {isContactFormOpen, toggleOpenContactUsForm} = useContactUsFormContext();

    const [problemTitle, setProblemTitle] = useState<string>('');
    const [problemBody, setProblemBody] = useState<string>('');
    
    // animation
    const slideUpAnim = useRef(new Animated.Value(height)).current;

    useEffect(() => {
        if (isContactFormOpen) {
            SlideIn(slideUpAnim, 0, 300);
        } else {
            SlideIn(slideUpAnim, height * 0.6, 300);
        }
    }, [isContactFormOpen]);

    // sets swipe right to go back disabled when popup is open
    useEffect(() => {
        setProblemTitle('');
        setProblemBody('');
      }, [isContactFormOpen]);

      const sendEmail = () => {
        // send email logic here
        toggleOpenContactUsForm();
      };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Animated.View style={[{transform: [{ translateY: slideUpAnim }]}, 
                        ContactFormStyle.container]}>
                <View style={ContactFormStyle.titleContainer}>
                    <TouchableOpacity onPress={() => {toggleOpenContactUsForm(); Keyboard.dismiss();}}>
                        <Image source={IMAGES.back_icon} />
                    </TouchableOpacity>
                    <Text style={ContactFormStyle.title}>דיווח על בעיה</Text>
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
        </TouchableWithoutFeedback>
    );
};

export default ContactForm;