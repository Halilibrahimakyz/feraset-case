import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Header } from '@/components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

// Logo detail screen component that displays a generated logo with its prompt and style
export default function LogoDetailScreen() {
    // Get parameters from URL
    const { id, imageUrl, prompt, style } = useLocalSearchParams();
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header with close button */}
            <Header
                backgroundColor='transparent'
                title='Your Design'
                titleColor='white'
                layout='left'
                titleFontSize={22}
                rightIcon={{
                    name: 'close',
                    color: 'white',
                    onPress: () => { router.back() }
                }}
            />
            {/* Background gradient image */}
            <Image
                source={require('../../../assets/images/back-gradient2.png')}
                style={styles.gradientImage}
                resizeMode="contain"
            />
            <View style={styles.content}>
                {/* Logo image display */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: imageUrl as string }}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>
                {/* Info section with prompt and style */}
                <View style={styles.infoContainer}>
                    {/* Gradient overlay for info container */}
                    <LinearGradient
                        colors={['#2938DC', '#943DFF']}
                        locations={[0, 0.75]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.containerGradient}
                    />
                    {/* Prompt section with copy button */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.label}>Prompt</Text>
                        <Pressable 
                            style={styles.copyButton}
                            onPress={async () => {
                                await Clipboard.setStringAsync(prompt as string);
                                Toast.show({
                                    type: 'success',
                                    text1: 'Copied to clipboard',
                                    position: 'bottom',
                                    visibilityTime: 2000,
                                    autoHide: true,
                                    bottomOffset: 40,
                                });
                            }}
                        >
                            <Image 
                                source={require('../../../assets/images/copy.png')}
                                style={styles.copyIcon}
                            />
                            <Text style={styles.copyButtonText}>Copy</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.value}>{prompt}</Text>
                    {/* Style tag display */}
                    <View style={styles.styleContainer}>
                        <Text style={styles.style}>{style}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

// Styles for the logo detail screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#09090B'
    },
    gradientImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'box-none'
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#27272A',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 24,
    },
    logoImage: {
        width: '100%',
        height: '100%',
        aspectRatio: 1,
    },
    infoContainer: {
        backgroundColor: '#27272A',
        borderRadius: 16,
        padding: 12,
        gap: 12,
    },
    containerGradient: {
        borderRadius: 16,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        opacity: 0.05,
        zIndex: 20,
        pointerEvents: 'box-none',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        color: 'white',
        fontFamily: 'Manrope',
        fontSize: 15,
        fontWeight: '800',
        lineHeight: 20,
    },
    value: {
        color: '#FAFAFA',
        fontFamily: 'Manrope',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 21,
        marginTop: 4,
    },
    style: {
        color: '#FAFAFA',
        fontFamily: 'Manrope',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
    },
    styleContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: 'rgba(250, 250, 250, 0.1)',
        borderRadius: 9999,
        alignSelf: 'flex-start',
    },
    copyButton: {
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    copyIcon: {
        width: 16,
        height: 16,
    },
    copyButtonText: {
        color: '#A1A1AA',
        fontFamily: 'Manrope',
        fontSize: 11,
        fontWeight: '400',
        lineHeight: 13,
    },
}); 