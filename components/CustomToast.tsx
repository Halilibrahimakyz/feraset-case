import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
    useAnimatedStyle, 
    useSharedValue, 
    withTiming,
    FadeIn,
    FadeOut
} from 'react-native-reanimated';

type ToastStatus = 'creating' | 'completed' | 'failed';

interface CustomToastProps {
    message: string;
    status: ToastStatus;
    subMessage: string;
    imageUrl?: string;
    onPress?: () => void;
}

const StatusIcon: React.FC<{ status: ToastStatus; imageUrl?: string }> = ({ status, imageUrl }) => {
    const getIconContent = () => {
        switch (status) {
            case 'completed':
                if (imageUrl) {
                    return (
                        <Image 
                            source={{ uri: imageUrl }} 
                            style={[styles.completedImage]} 
                        />
                    );
                }
                return null;
            case 'failed':
                return (
                    <View style={[styles.failedIconContainer]}>
                        <Image
                            source={require('../assets/images/alert-circle.png')}
                            style={styles.icon}
                            resizeMode="contain"
                        />
                    </View>
                );
            case 'creating':
            default:
                return (
                    <View style={styles.iconContainer}>
                        <ActivityIndicator size="small" color="white" />
                    </View>
                );
        }
    };

    return (
        <View style={[
            styles.iconContainer,
            status === 'failed' && styles.failedIconBackground
        ]}>
            {getIconContent()}
        </View>
    );
};

const StatusContent: React.FC<{ status: ToastStatus; message: string; subMessage: string }> = ({ 
    status, 
    message, 
    subMessage 
}) => {
    const getBackgroundColor = () => {
        switch (status) {
            case 'creating':
                return '#27272A';
            case 'completed':
                return 'transparent';
            case 'failed':
                return '#EF4444';
            default:
                return 'transparent';
        }
    };

    return (
        <View style={[
            styles.contentContainer,
            { backgroundColor: getBackgroundColor() },
        ]}>
            {(status === 'creating' || status === 'completed') && (
                <LinearGradient
                    colors={['#2938DC', '#943DFF']}
                    locations={[0, 0.75]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[
                        styles.gradient,
                        { opacity: status === 'creating' ? 0.05 : 1 }
                    ]}
                />
            )}
            <Text style={[styles.message]}>{message}</Text>
            <Text style={[styles.subMessage]}>{subMessage}</Text>
        </View>
    );
};

export const CustomToast: React.FC<CustomToastProps> = ({ 
    message, 
    status, 
    subMessage, 
    imageUrl, 
    onPress
}) => {

    return (
        <Pressable onPress={onPress}>
            <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                style={[
                    styles.container,
                    status === 'creating' && styles.creating,
                    status === 'completed' && styles.completed,
                    status === 'failed' && styles.failed,
                ]}
            >
                <StatusIcon status={status} imageUrl={imageUrl} />
                <StatusContent 
                    status={status} 
                    message={message} 
                    subMessage={subMessage} 
                />
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        marginHorizontal: 24,
        marginVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#18181B',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    failedIconBackground: {
        backgroundColor: 'white',
    },
    failedIconContainer: {
        width: 70,
        height: 70,
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    completedImage: {
        width: 70,
        height: 70,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    contentContainer: {
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        paddingLeft: 12,
        flex: 1,
        height: 70,
        justifyContent: 'center',
    },
    gradient: {
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 0,
        pointerEvents: 'box-none',
    },
    message: {
        color: 'white',
        fontSize: 16,
        fontWeight: '900',
        fontFamily: 'Manrope',
        lineHeight: 21,
        letterSpacing: -0.1,
    },
    subMessage: {
        color: 'white',
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Manrope',
        lineHeight: 18,
        marginTop: 4,
        letterSpacing: -0.1,
    },
    creating: {
        backgroundColor: '#27272A',
    },
    completed: {
        backgroundColor: '#27272A',
    },
    failed: {
        backgroundColor: '#27272A',
    },
    icon: {
        width: 32,
        height: 32,
    },
}); 