import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import { API_URL } from '../config/api';

export default function TelaCadastro({
  irParaInicial,
  irParaLogin,
  irParaBoasVindas,
}) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [curso, setCurso] = useState('');
  const [turma, setTurma] = useState('');

  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarVisivel, setConfirmarVisivel] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async () => {
    if (!nome.trim() || !email.trim() || !senha || !confirmarSenha || !curso.trim() || !turma.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setCarregando(true);

    try {
       const resposta = await fetch(API_URL + '/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim().toLowerCase(),
          senha,
          perfil: 'aluno',
          curso: curso.trim(),
          turma: turma.trim(),
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        Alert.alert(
          'Não foi possível cadastrar',
          dados.message || 'Ocorreu um erro ao realizar o cadastro.'
        );
        return;
      }

      Alert.alert(
        'Cadastro realizado!',
        'Sua conta foi criada com sucesso.',
        [
          {
            text: 'Continuar',
            onPress: irParaInicial,
          },
        ]
      );
    } catch (error) {
      console.error('Erro no cadastro:', error);

      Alert.alert(
        'Erro de conexão',
        'Não foi possível conectar ao servidor. Verifique se o backend está funcionando e se o celular está conectado à mesma rede Wi-Fi do computador.'
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
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>QuadraSync</Text>
          <Text style={styles.subtitle}>
            Crie sua conta para começar
          </Text>

          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor="#9CA3AF"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
          />

          <Text style={[styles.label, { marginTop: 20 }]}>
            E-mail
          </Text>
          <TextInput
            style={styles.input}
            placeholder="seuemail@exemplo.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={[styles.label, { marginTop: 20 }]}>
            Curso
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Desenvolvimento de Sistemas"
            placeholderTextColor="#9CA3AF"
            value={curso}
            onChangeText={setCurso}
            autoCapitalize="words"
          />

          <Text style={[styles.label, { marginTop: 20 }]}>
            Turma
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: 3º DS"
            placeholderTextColor="#9CA3AF"
            value={turma}
            onChangeText={setTurma}
            autoCapitalize="characters"
          />

          <Text style={[styles.label, { marginTop: 20 }]}>
            Senha
          </Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Crie uma senha"
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

          <Text style={[styles.label, { marginTop: 20 }]}>
            Confirmar senha
          </Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Repita a senha"
              placeholderTextColor="#9CA3AF"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={!confirmarVisivel}
            />

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setConfirmarVisivel(!confirmarVisivel)}
              style={styles.toggleButton}
            >
              <Text style={styles.toggleText}>
                {confirmarVisivel ? 'Ocultar' : 'Mostrar'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleCadastro}
            style={[
              styles.registerButton,
              carregando && styles.registerButtonLoading,
            ]}
            disabled={carregando}
          >
            <Text style={styles.buttonText}>
              {carregando ? 'Cadastrando...' : 'Cadastrar'}
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={irParaLogin}
            style={styles.loginLink}
          >
            <Text style={styles.loginText}>
              Já possui conta?{' '}
              <Text style={styles.loginBold}>Entrar</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 80,
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
    textShadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 1 },
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
    shadowOffset: { width: 0, height: 1 },
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

  registerButton: {
    backgroundColor: '#1565C0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    elevation: 4,
    shadowColor: '#1565C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  registerButtonLoading: {
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

  loginLink: {
    alignItems: 'center',
    paddingBottom: 20,
  },

  loginText: {
    fontSize: 15,
    color: '#6B7280',
  },

  loginBold: {
    color: '#1565C0',
    fontWeight: '700',
  },
});