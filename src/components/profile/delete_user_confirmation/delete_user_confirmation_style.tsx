import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        width: '90%',
        maxWidth: 400,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titleContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#d32f2f',
        textAlign: 'center',
    },
    messageContainer: {
        marginBottom: 30,
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: '600',
    },
    consequences: {
        fontSize: 14,
        color: '#666',
        textAlign: 'right',
        lineHeight: 20,
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#d32f2f',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 15,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
    deleteButton: {
        flex: 1,
        backgroundColor: '#d32f2f',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});