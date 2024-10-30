import { View, Text } from "react-native";
import { useEffect } from "react";

import ContactFormStyle from './contact_form_style';

import { useContactUsFormContext } from "../../context/general_context/contact_form_context";
import { useNavigation } from "@react-navigation/native";


const ContactForm = () => {
    const navigation = useNavigation();
    
    const {isContactFormOpen, toggleOpenContactUsForm} = useContactUsFormContext();
    
    useEffect(() => {
        navigation.setOptions({
          gestureEnabled: !false,
        });
      }, [isContactFormOpen]);

    return (
        <View style={[{display: isContactFormOpen ? 'flex' : 'none'}, ContactFormStyle.container]}>
            <Text>hello world</Text>
        </View>
    );
};

export default ContactForm;