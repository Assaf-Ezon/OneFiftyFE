import { View, Text, TouchableOpacity, Image, Animated, Dimensions, Keyboard, Linking, Alert } from "react-native";
import { useEffect, useRef } from "react";

import { IMAGES } from "../../image_handler";

import ContactFormStyle from './contact_form_style';

import { useContactUsFormContext } from "../../context/general_context/contact_form_context";
import { SlideIn } from "../../animations/slide_animation";
import { CONFIG } from "../../config";
import { useProfile } from "../../context/general_context/profile_context";

const { height } = Dimensions.get('window');

const ContactForm = () => {
    const { isContactFormOpen, toggleOpenContactUsForm } = useContactUsFormContext();
    const { profile } = useProfile();
    
    // animation
    const slideUpAnim = useRef(new Animated.Value(height)).current;

    useEffect(() => {
        if (isContactFormOpen) {
            SlideIn(slideUpAnim, 0, 300);
        } else {
            SlideIn(slideUpAnim, height * 0.6, 300);
        }
    }, [isContactFormOpen]);

    const sendEmail = () => {
        const subject = `שם משתמש: ${profile.name}`;
        const body = `גוף הפניה: \n ---------------------------`;
        const mailtoURL = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        toggleOpenContactUsForm();

        Linking.openURL(mailtoURL).catch(err => {
            console.error(`Error opening email app: ${err}`);
            Alert.alert('לא היה ניתן להפנות לאימייל, אנא נסו שנית מאוחר יותר');
        });
    };

    return (
        <Animated.View style={[{transform: [{ translateY: slideUpAnim }]}, 
                    ContactFormStyle.container]}>
            <View style={ContactFormStyle.titleContainer}>
                <TouchableOpacity onPress={() => {toggleOpenContactUsForm(); Keyboard.dismiss();}}>
                    <Image source={IMAGES.back_icon} />
                </TouchableOpacity>
                <Text style={ContactFormStyle.title} allowFontScaling={false}>פנו אלינו</Text>
            </View>
            <View style={ContactFormStyle.EmailContact}>
                <TouchableOpacity style={ContactFormStyle.EmailContactBtn} onPress={() => {sendEmail()}}>
                    <Text style={ContactFormStyle.EmailContactBtnText}>פנו אלינו במייל: {'\n'}{CONFIG.email}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default ContactForm;