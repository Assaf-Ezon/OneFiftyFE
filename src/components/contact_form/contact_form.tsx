import { View, Text } from "react-native";

import ContactFormStyle from './contact_form_style';

import { useContactUsFormContext } from "../../context/general_context/contact_form_context";

const ContactForm = () => {
    const {isContactFormOpen, toggleOpenContactUsForm} = useContactUsFormContext();

    return (
        <View style={[{display: isContactFormOpen ? 'flex' : 'none'}, ContactFormStyle.container]}>
            <Text>Hello world</Text>
        </View>
    );
};

export default ContactForm;