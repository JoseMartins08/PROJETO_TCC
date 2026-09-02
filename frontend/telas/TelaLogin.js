import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import { API_URL } from '../config/api';

export default function TelaLogin({
  irParaInicial,
  irParaCadastro,
  irParaBoasVindas,
}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !senha) {
      Alert.alert(
        'Campos obrigatórios',
        'Digite seu e-mail e sua senha.'
      );
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok || !dados.success) {
        Alert.alert(
          'Não foi possível entrar',
          dados.message || 'E-mail ou senha inválidos.'
        );
        return;
      }

      console.log('Login realizado:', dados.usuario);
      console.log('Token recebido:', dados.token);

      irParaInicial();

    } catch (error) {
      console.error('Erro ao realizar login:', error);

      Alert.alert(
        'Erro de conexão',
        'Não foi possível conectar ao servidor. Verifique se o backend está funcionando e se o celular está na mesma rede Wi-Fi do computador.'
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={irParaBoasVindas}
        style={styles.voltarContainer}
      >
        <Text style={styles.voltarText}>← Voltar</Text>
      </TouchableOpacity>

      <View style={styles.decorationTopLeft} />
      <View style={styles.decorationBottomRight} />

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >

        <Text style={styles.title}>QuadraSync</Text>

        <Text style={styles.subtitle}>
          Faça seu login para continuar
        </Text>

        <Text style={styles.label}>E-mail</Text>

        <TextInput
          style={styles.input}
          placeholder="seuemail@exemplo.com"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />

        <View style={styles.labelRow}>
          <Text style={styles.label}>Senha</Text>

          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.forgotText}>
              Esqueceu sua senha?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>

          <TextInput
            style={styles.inputPassword}
            placeholder="Digite sua senha"
            placeholderTextColor="#9CA3AF"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!senhaVisivel}
          />

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setSenhaVisivel(!senhaVisivel)}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>
              {senhaVisivel ? 'Ocultar' : 'Mostrar'}
            </Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleLogin}
          style={[
            styles.loginButton,
            carregando && styles.loginButtonLoading,
          ]}
          disabled={carregando}
        >
          <Text style={styles.buttonText}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />

          <Text style={styles.dividerText}>
            ou
          </Text>

          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={irParaCadastro}
          style={styles.registerLink}
        >
          <Text style={styles.registerText}>
            Não possui conta?{' '}
            <Text style={styles.registerBold}>
              Cadastre-se
            </Text>
          </Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  voltarContainer: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
    padding: 10,
  },

  voltarText: {
    fontSize: 16,
    color: '#1565C0',
    fontWeight: '600',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },

  decorationTopLeft: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(21, 101, 192, 0.08)',
    transform: [{ rotate: '15deg' }],
  },

  decorationBottomRight: {
    position: 'absolute',
    bottom: -80,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(21, 101, 192, 0.06)',
    transform: [{ rotate: '-10deg' }],
  },

  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0D47A1',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 8,
    textShadowColor: 'rgba(21, 101, 192, 0.2)',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 4,
  },

  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },

  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 20,
  },

  forgotText: {
    fontSize: 13,
    color: '#1565C0',
    fontWeight: '500',
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1F2937',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  inputPassword: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1F2937',
  },

  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  toggleText: {
    fontSize: 13,
    color: '#1565C0',
    fontWeight: '600',
  },

  loginButton: {
    backgroundColor: '#1565C0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    elevation: 4,
    shadowColor: '#1565C0',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  loginButtonLoading: {
    backgroundColor: '#94A3B8',
    elevation: 0,
    shadowOpacity: 0,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  dividerText: {
    paddingHorizontal: 15,
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },

  registerLink: {
    alignItems: 'center',
  },

  registerText: {
    fontSize: 15,
    color: '#6B7280',
  },

  registerBold: {
    color: '#1565C0',
    fontWeight: '700',
  },
});