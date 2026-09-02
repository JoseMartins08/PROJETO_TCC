import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'; // Adicionei o Image aqui

export default function TelaSplash({ irParaBoasVindas }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      irParaBoasVindas();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Decorative background elements */}
      <View style={styles.decorationTopLeft} />
      <View style={styles.decorationBottomRight} />
      <View style={styles.decorationCenter} />

      {/* Main content */}
      <View style={styles.content}>
        {/* Sua Logotipo */}
        <Image 
          source={require('../assets/QuadraSync_SemNome-Photoroom.png')} 
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Text shadow effect (duplicated text for compatibility) */}
        <Text style={styles.textShadow}>QuadraSync</Text>
        <Text style={styles.textMain}>QuadraSync</Text>

        {/* Decorative divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerDot} />
          <View style={styles.dividerSpace} />
          <View style={styles.dividerDot} />
          <View style={styles.dividerSpace} />
          <View style={styles.dividerDot} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D47A1', // Deeper blue for more elegance
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Background decorations - subtle geometric shapes
  decorationTopLeft: {
    position: 'absolute',
    top: -80,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    transform: [{ rotate: '30deg' }],
  },

  decorationBottomRight: {
    position: 'absolute',
    bottom: -100,
    right: -100,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    transform: [{ rotate: '-20deg' }],
  },

  decorationCenter: {
    position: 'absolute',
    top: 30,
    left: 30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },

  content: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 1, // Ensures content is above decorations
  },

  // Estilo da Logotipo
  logo: {
    width: 600, // Largura da imagem
    height: 600, // Altura da imagem
    marginBottom: 20, // Espaço entre a logo e o texto
  },

  // Text shadow (using duplicated text technique)
  textShadow: {
    fontSize: 50,
    fontWeight: '800',
    color: 'rgba(0, 0, 0, 0.25)',
    marginBottom: -3, // Compensates for shadow offset
    letterSpacing: 0.8,
  },

  textMain: {
    fontSize: 50,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },

  // Decorative divider below text
  dividerContainer: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },

  dividerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },

  dividerSpace: {
    width: 14,
  },
});