import { View, Text, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import React, { useState, useRef, useCallback } from 'react';
import { Header } from '@/components/Header';
import { useCreateLogo } from '../../src/hooks/useCreateLogo';
import { CustomToast } from '@/components/CustomToast';
import { useRouter } from 'expo-router';
import LogoStylesList from './components/LogoStylesList';
import CreateButton from './components/CreateButton';
import CustomInput from './components/CustomInput';
import { logoStyles } from '../../src/constants/logoStyles';

type ToastStatus = 'creating' | 'completed' | 'failed' | null;

interface LogoState {
  prompt: string;
  selectedStyle: number;
  error: string | null;
  toast: {
    status: ToastStatus;
    message: string;
    subMessage: string;
    imageUrl: string;
  };
  lastCreatedLogo: {
    id: string;
    prompt: string;
    style: string;
  } | null;
}

// Main screen component for AI logo creation
export default function HomeScreen() {
  const router = useRouter();
  const textInputRef = useRef<TextInput>(null);
  const { mutateAsync: createLogo, isPending, surpriseMe } = useCreateLogo();

  // State management for logo creation process
  const [state, setState] = useState<LogoState>({
    prompt: '',
    selectedStyle: 0,
    error: null,
    toast: {
      status: null,
      message: '',
      subMessage: '',
      imageUrl: '',
    },
    lastCreatedLogo: null,
  });

  // Handle logo creation process
  const handleCreate = useCallback(async () => {
    if (!state.prompt.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter a prompt' }));
      return;
    }
    textInputRef.current?.blur();
  
    setState(prev => ({
      ...prev,
      error: null,
      prompt: '',
      toast: {
        status: 'creating',
        message: 'Creating Your Design...',
        subMessage: 'Ready in 2 minutes',
        imageUrl: '',
      },
    }));
    
    try {
      const response = await createLogo({
        prompt: state.prompt,
        style: logoStyles[state.selectedStyle].key,
      });
      
      setState(prev => ({
        ...prev,
        toast: {
          status: 'completed',
          message: 'Your Design is Ready!',
          subMessage: 'Tap to see it.',
          imageUrl: response.imageUrl || '',
        },
        lastCreatedLogo: {
          id: response.id,
          prompt: state.prompt,
          style: logoStyles[state.selectedStyle].key,
        },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to create logo',
        toast: {
          status: 'failed',
          message: 'Oops, something went wrong!',
          subMessage: 'Click to try again.',
          imageUrl: '',
        },
      }));
      console.error('Error creating logo:', error);
    }
  }, [state.prompt, state.selectedStyle, createLogo]);

  // Navigate to logo details when toast is pressed
  const handleToastPress = useCallback(() => {
    if (state.toast.status === 'completed' && state.lastCreatedLogo) {
      router.push({
        pathname: '/logo/[id]',
        params: {
          id: state.lastCreatedLogo.id,
          imageUrl: state.toast.imageUrl,
          prompt: state.lastCreatedLogo.prompt,
          style: logoStyles[state.selectedStyle].label,
        },
      });
    }
  }, [state.toast.status, state.lastCreatedLogo, state.toast.imageUrl, state.selectedStyle, router]);

  // Generate random prompt
  const handleSurprise = useCallback(async () => {
    try {
      const response = await surpriseMe();
      setState(prev => ({ ...prev, prompt: response.prompt }));
    } catch (error) {
      console.error('Error getting surprise prompt:', error);
    }
  }, [surpriseMe]);

  // Handle style selection
  const handleStyleSelect = useCallback((styleId: number) => {
    setState(prev => ({ ...prev, selectedStyle: styleId }));
  }, []);

  // Handle input changes
  const handleInputChange = useCallback((text: string) => {
    setState(prev => ({ ...prev, prompt: text, error: null }));
  }, []);

  return (
    <View style={styles.container}>
      <Header
        backgroundColor='transparent'
        title='AI Logo'
        titleColor='white'
        titleFontSize={17}
      />
      <Image
        source={require('../../assets/images/back-gradient2.png')}
        style={styles.gradientImage}
        resizeMode="contain"
      />
      <View style={styles.content}>
        {state.toast.status && (
          <CustomToast
            message={state.toast.message}
            status={state.toast.status}
            subMessage={state.toast.subMessage}
            imageUrl={state.toast.imageUrl}
            onPress={handleToastPress}
          />
        )}
        <View style={styles.header}>
          <Text style={styles.headerText}>Enter Your Prompt</Text>
          <Pressable onPress={handleSurprise} style={styles.surpriseButton}>
            <Image
              source={require('../../assets/images/dice.png')}
              style={styles.diceIcon}
              resizeMode='contain'
            />
            <Text style={styles.surpriseText}>Surprise me</Text>
          </Pressable>
        </View>
        <CustomInput
          value={state.prompt}
          textInputRef={textInputRef}
          onChangeText={handleInputChange}
          error={state.error}
          placeholder="A blue lion logo reading 'HEXA' in bold letters"
          maxLength={500}
        />
        <LogoStylesList
          selectedStyle={state.selectedStyle}
          onStyleSelect={handleStyleSelect}
        />
      </View>
      <View style={styles.footer}>
        <CreateButton onPress={handleCreate} isPending={isPending} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#09090B'
  },
  gradientImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Manrope',
    fontSize: 20,
    fontWeight: '800',
    color: 'white'
  },
  surpriseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  diceIcon: {
    width: 13,
    height: 18
  },
  surpriseText: {
    fontFamily: 'Manrope',
    fontSize: 13,
    fontWeight: '400',
    color: 'white'
  },
  footer: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 46,
    alignItems: 'center',
  },
}); 