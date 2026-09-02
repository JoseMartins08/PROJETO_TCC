import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';

// Dados do usuário movidos para fora da função para otimizar performance
const user = {
  name: "[Nome Sobrenome]",
  email: "nome.sobrenome@aluno.cps.sp.gov.br",
  studentId: "240125",
  course: "Desenvolvimento de Sistemas",
  ano: "3º Ano",
  stats: {
    reservations: 12,
    leagueGames: 8,
    hoursPlayed: 45,
    favoriteSport: "Futsal"
  }
};

export default function TelaPerfil({
   irParaInicial,
   irParaCalendario,
   irParaEL,
   irParaNotificacoes,
   deslogar 
}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Perfil</Text>
          <Text style={styles.headerSubtitle}>Seus dados e configurações</Text>
        </View>
        <TouchableOpacity activeOpacity={0.6} onPress={irParaInicial} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Avatar Card */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarBg}>
            <Text style={styles.avatarText}>NS</Text>
          </View>
          <Text style={styles.avatarName}>{user.name}</Text>
          <Text style={styles.avatarSubtitle}>{user.studentId} • {user.course}</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📅</Text>
              <View style={styles.statTextContainer}>
                <Text style={styles.statNumber}>{user.stats.reservations}</Text>
                <Text style={styles.statLabel}>Reservas</Text>
              </View>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🏆</Text>
              <View style={styles.statTextContainer}>
                <Text style={styles.statNumber}>{user.stats.leagueGames}</Text>
                <Text style={styles.statLabel}>Jogos na Liga</Text>
              </View>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>⏱️</Text>
              <View style={styles.statTextContainer}>
                <Text style={styles.statNumber}>{user.stats.hoursPlayed}</Text>
                <Text style={styles.statLabel}>Horas</Text>
              </View>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>⚽</Text>
              <View style={styles.statTextContainer}>
                <Text style={styles.statNumber}>—</Text>
                <Text style={styles.statLabel}>{user.stats.favoriteSport}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Account Info */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informações da Conta</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nome Completo</Text>
              <Text style={styles.infoValue}>{user.name}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>E-mail</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Curso</Text>
              <Text style={styles.infoValue}>{user.course}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ano</Text>
              <Text style={styles.infoValue}>{user.ano}</Text>
            </View>
          </View>
        </View>

        {/* Settings Menu */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          <View style={styles.settingsContainer}>
            <TouchableOpacity activeOpacity={0.6} style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <Text style={styles.settingsItemIcon}>🔔</Text>
                <Text style={styles.settingsItemText}>Notificações</Text>
              </View>
              <Text style={styles.settingsItemArrow}>›</Text>
            </TouchableOpacity>
            <View style={styles.settingsDivider} />
            <TouchableOpacity activeOpacity={0.6} style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <Text style={styles.settingsItemIcon}>🔒</Text>
                <Text style={styles.settingsItemText}>Privacidade e Segurança</Text>
              </View>
              <Text style={styles.settingsItemArrow}>›</Text>
            </TouchableOpacity>
            <View style={styles.settingsDivider} />
            <TouchableOpacity activeOpacity={0.6} style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <Text style={styles.settingsItemIcon}>🎨</Text>
                <Text style={styles.settingsItemText}>Tema e Aparência</Text>
              </View>
              <Text style={styles.settingsItemArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity activeOpacity={0.6} onPress={deslogar} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Menu Inferior */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity activeOpacity={0.6} onPress={irParaInicial} style={styles.menuItem}>
          <Text style={styles.menuIcon}>🏠</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6} onPress={irParaCalendario} style={styles.menuItem}>
          <Text style={styles.menuIcon}>📅</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6} onPress={irParaEL} style={styles.menuItem}>
          <Text style={styles.menuIcon}>🏆</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6} onPress={irParaNotificacoes} style={styles.menuItem}>
          <Text style={styles.menuIcon}>🔔</Text>
        </TouchableOpacity>

        <View style={styles.menuItemSelected}>
          <Text style={styles.menuIconActive}>👤</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 110,
    paddingTop: 24,
  },

  // Header
  header: { 
    backgroundColor: '#1565C0', 
    paddingTop: 50, 
    paddingBottom: 30, 
    paddingHorizontal: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: { 
    alignItems: 'flex-start',
    flexShrink: 1,
  },
  headerTitle: { 
    color: '#FFFFFF', 
    fontSize: 24, 
    fontWeight: '800', 
    letterSpacing: -0.5 
  },
  headerSubtitle: { 
    color: '#BFDBFE', 
    fontSize: 13, 
    fontWeight: '500', 
    marginTop: 2 
  },
  backButton: { 
    backgroundColor: 'rgba(255, 255, 255, 0.15)', 
    paddingVertical: 8, 
    paddingHorizontal: 14, 
    borderRadius: 12,
    marginLeft: 16,
  },
  backButtonText: { 
    color: '#FFFFFF', 
    fontSize: 12, 
    fontWeight: '700' 
  },

  // Avatar
  avatarContainer: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  avatarBg: {
    width: 90,
    height: 90,
    borderRadius: 30,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#BFDBFE',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1565C0',
  },
  avatarName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  avatarSubtitle: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },

  // Sections
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },

  // Stats Grid
  statsSection: { marginHorizontal: 20, marginTop: 20 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statIcon: { fontSize: 24, marginRight: 12 },
  statTextContainer: { flex: 1 },
  statNumber: { fontSize: 20, fontWeight: '800', color: '#1565C0' },
  statLabel: { fontSize: 11, color: '#64748B', fontWeight: '600', marginTop: 1 },

  // Account Info
  infoSection: { marginHorizontal: 20, marginTop: 12 },
  infoCard: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 18, 
    borderWidth: 1, 
    borderColor: '#E2E8F0', 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  infoDivider: { height: 1, backgroundColor: '#F1F5F9', marginHorizontal: 16 },
  infoLabel: { fontSize: 13, color: '#64748B', fontWeight: '600', flexShrink: 1 },
  infoValue: { fontSize: 13, color: '#0F172A', fontWeight: '700', textAlign: 'right', marginLeft: 16, flexShrink: 1 },

  // Settings Menu
  settingsSection: { marginHorizontal: 20, marginTop: 20 },
  settingsContainer: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 18, 
    borderWidth: 1, 
    borderColor: '#E2E8F0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  settingsItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  settingsDivider: { height: 1, backgroundColor: '#F1F5F9', marginHorizontal: 16 },
  settingsItemLeft: { flexDirection: 'row', alignItems: 'center' },
  settingsItemIcon: { fontSize: 18, marginRight: 12 },
  settingsItemText: { fontSize: 14, color: '#0F172A', fontWeight: '600' },
  settingsItemArrow: { fontSize: 22, color: '#CBD5E1', fontWeight: '700' },

  // Logout
  logoutButton: {
    backgroundColor: '#FEE2E2',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    alignItems: 'center',
  },
  logoutButtonText: { color: '#DC2626', fontSize: 14, fontWeight: '800' },

  // Menu Inferior
  bottomMenu: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    height: 70, 
    backgroundColor: '#FFFFFF', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1, 
    borderTopColor: '#E2E8F0', 
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItem: { 
    width: 45, 
    height: 45, 
    borderRadius: 22.5, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  menuItemSelected: { 
    width: 45, 
    height: 45, 
    borderRadius: 22.5, 
    backgroundColor: '#E3F2FD', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  menuIcon: { 
    fontSize: 24 
  },
  menuIconActive: { 
    fontSize: 24, 
    color: '#1565C0' 
  },
});