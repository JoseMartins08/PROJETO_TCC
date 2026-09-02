import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function TelaBoasVindas({ irParaLogin, irParaCadastro }) {
  return (
    <View style={styles.container}>
      {/* Elementos decorativos de fundo */}
      <View style={styles.decorationTop} />
      <View style={styles.decorationBottom} />

      {/* Conteúdo principal centralizado */}
      <View style={styles.content}>
        {/* Logotipo (Sem nome) */}
        <Image 
          source={require('../assets/QuadraSync_SemNome-Photoroom.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        
        {/* Título do App */}
        <Text style={styles.title}>QuadraSync</Text>

        {/* Subtítulo / Slogan */}
        <Text style={styles.subtitle}>
          Seu aplicativo de reservas de quadras
        </Text>
      </View>

      {/* Rodapé com os botões de ação */}
      <View style={styles.footer}>
        {/* Botão Principal */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={irParaLogin}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Botão Secundário */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={irParaCadastro}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 30,
    paddingVertical: 50,
    justifyContent: 'space-between', 
  },

  // Decorações de fundo
  decorationTop: {
    position: 'absolute',
    top: -120,
    left: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(21, 101, 192, 0.08)',
    transform: [{ rotate: '15deg' }],
  },

  decorationBottom: {
    position: 'absolute',
    bottom: -100,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(21, 101, 192, 0.06)',
    transform: [{ rotate: '-10deg' }],
  },

  // Conteúdo central
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 400, // Tamanho mantido conforme o seu ajuste visual
    height: 400,
    marginBottom: -80,
  },

  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0D47A1',
    letterSpacing: -0.5,
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic', 
    paddingHorizontal: 20,
  },

  // Rodapé
  footer: {
    paddingBottom: 20, 
  },

  // Botão Primário (Entrar)
  primaryButton: {
    backgroundColor: '#1565C0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4, 
    shadowColor: '#1565C0', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Botão Secundário (Cadastrar)
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: '#1565C0',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: 'transparent',
    marginTop: 12,
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#1565C0',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});