import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Modal } from 'react-native';
import React from 'react';
import DeleteUserConfirmationStyle from './delete_user_confirmation_style';
import { useProfile } from '../../../context/general_context/profile_context';
import { useDeleteUserConfirmationContext } from '../../../context/general_context/delete_user_confirmation_context';
import { useStackManagerContext, StackNames } from '../../../context/general_context/stack_manager_context';
import * as SecureStore from 'expo-secure-store';
import { CONFIG } from '../../../config';
import DeleteUserRequestHandler from '../../../requests/requests_handlers/delete_user_request_handler';
import AuthenticationHandler from '../../../authentication_handler';

const DeleteUserConfirmation = () => {
    const { isDeleteUserConfirmationOpen, toggleCloseDeleteUserConfirmation } = useDeleteUserConfirmationContext();
    const { setStackIndexByName } = useStackManagerContext();
    const authInstance = AuthenticationHandler.getInstance();
    
    const handleDeleteUser = async () => {
        try {
            const name = await authInstance.getName();
            const token = await authInstance.getAccessToken();

            await DeleteUserRequestHandler.getInstance().post({
                DisplayName: name,
                token: token,
            });
            
            Alert.alert('', 'חשבונך נמחק בהצלחה', [
                { text: 'אישור', onPress: async () => {
                    toggleCloseDeleteUserConfirmation();
                    
                    // Clear SecureStore since user is deleted
                    await SecureStore.setItemAsync(CONFIG.access_token, '');
                    await SecureStore.setItemAsync(CONFIG.refresh_token, '');
                    await SecureStore.setItemAsync(CONFIG.name, '');
                    
                    // Set tokens to expired
                    authInstance.setAccessTokenToExpired();
                    authInstance.setRefreshTokenToExpired();
                    
                    // Navigate to start screen
                    setStackIndexByName(StackNames.Auth);
                }}
            ]);
        } catch (error) {
            Alert.alert('שגיאה', 'אירעה שגיאה במחיקת החשבון. אנא נסה שוב.');
        }
    };

    const handleCancel = () => {
        toggleCloseDeleteUserConfirmation();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isDeleteUserConfirmationOpen}
            onRequestClose={handleCancel}
        >
            <View style={DeleteUserConfirmationStyle.overlay}>
                <View style={DeleteUserConfirmationStyle.container}>
                    <View style={DeleteUserConfirmationStyle.titleContainer}>
                        <Text style={DeleteUserConfirmationStyle.title} allowFontScaling={false}>
                            מחיקת חשבון
                        </Text>
                    </View>
                    
                    <View style={DeleteUserConfirmationStyle.messageContainer}>
                        <Text style={DeleteUserConfirmationStyle.message} allowFontScaling={false}>
                            האם אתה בטוח שברצונך למחוק את החשבון שלך?
                        </Text>
                        <Text style={DeleteUserConfirmationStyle.consequences} allowFontScaling={false}>
                            פעולה זו תמחק לצמיתות את:
                            {'\n'}• כל ההתקדמות שלך
                            {'\n'}• המילים שתרגלת
                            {'\n'}• הסטטיסטיקות שלך
                            {'\n'}• פרטי החשבון
                            {'\n\n'}לא ניתן לבטל פעולה זו!
                        </Text>
                    </View>

                    <View style={DeleteUserConfirmationStyle.buttonsContainer}>
                        <TouchableOpacity 
                            style={DeleteUserConfirmationStyle.cancelButton} 
                            onPress={handleCancel}
                        >
                            <Text style={DeleteUserConfirmationStyle.cancelButtonText} allowFontScaling={false}>
                                ביטול
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={DeleteUserConfirmationStyle.deleteButton} 
                            onPress={handleDeleteUser}
                        >
                            <Text style={DeleteUserConfirmationStyle.deleteButtonText} allowFontScaling={false}>
                                מחק חשבון
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default DeleteUserConfirmation;