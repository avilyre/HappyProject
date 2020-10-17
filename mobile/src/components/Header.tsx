import { useFonts } from 'expo-font';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

interface HeaderProps {
    title: string,
    showCancel?: boolean
}

export default function Header({ title, showCancel = true }: HeaderProps) {

    const navigation = useNavigation();

    const [fontsFloaded] = useFonts({
        nunito400: Nunito_400Regular,
        nunito600: Nunito_600SemiBold,
        nunito700: Nunito_700Bold,
        nunito800: Nunito_800ExtraBold
    });

    if(!fontsFloaded) {
        return <View></View>;
    }

    function goToHomePage() {
        navigation.navigate('OrphanagesMap');
    }

    return (
        <View style={styles.container}>

            <BorderlessButton onPress={navigation.goBack}>
                <Feather name="arrow-left" color="#20DCB6" size={24} />
            </BorderlessButton>

            <Text style={styles.title}>{title}</Text>

            {showCancel ?
                <BorderlessButton onPress={goToHomePage}>
                    <Feather name="x" color="#FF669D" size={24} />
                </BorderlessButton>
            :
                <View></View>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#F9FAFC',
        borderColor: '#DDE3F0',
        paddingTop: 44,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    title: {
        fontFamily: 'nunito400',
        color: '#8FA7B3',
        fontSize: 16
    }
});