import { StyleSheet, KeyboardAvoidingView, View } from 'react-native';

import { colors } from 'src/styles/color';

const MainLayout = (props) => {
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Set behavior based on platform
        >
            {/* Header */}
            <View style={styles.header}>{props.header}</View>

            {/* Main content */}
            <View style={styles.mainContent}>{props.children}</View>
        </KeyboardAvoidingView>
    );
};

export default MainLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingTop: 16,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    header: {
        marginTop: 25,
        // paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContent: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 35,
        marginTop: 25,
        padding: 15,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
