import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';

// Dados movidos para fora do componente para otimizar performance
const notifications = [
  { id: 1, title: 'Reserva aprovada!', subtitle: 'Futsal - 03/03 às 14:30', time: '10:15', icon: '✅', bgColor: '#D1FAE5', read: false },
  { id: 2, title: 'Lembrete de jogo', subtitle: 'Etec League - Fase de grupos hoje às 12:00', time: '09:30', icon: '🏆', bgColor: '#FEF3C7', read: false },
  { id: 3, title: 'Atualização disponível', subtitle: 'Nova versão 2.1.0 com melhorias', time: '08:00', icon: '📱', bgColor: '#DBEAFE', read: true },
  { id: 4, title: 'Nova solicitação', subtitle: 'Kenai Haoni quer se juntar ao seu time', time: 'Ontem', icon: '👥', bgColor: '#EDE9FE', read: true },
];

export default function TelaNotificacoes({ 
  irParaInicial, 
  irParaCalendario,
  irParaPerfil,
  irParaEL 
}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Notificações</Text>
          <Text style={styles.headerSubtitle}>Fique por dentro das novidades</Text>
        </View>
        <TouchableOpacity activeOpacity={0.6} onPress={irParaInicial} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Lista de Notificações */}
        {notifications.map((n) => (
          <View key={n.id} style={styles.notificationCard}>
            <View style={[styles.notificationIcon, { backgroundColor: n.bgColor }]}>
              <Text style={styles.iconText}>{n.icon}</Text>
            </View>
            
            <View style={styles.textContainer}>
              <View style={styles.titleRow}>
                {/* Indicador de não lida */}
                {!n.read && <View style={styles.unreadDot} />}
                <Text style={styles.title}>{n.title}</Text>
              </View>
              <Text style={styles.subtitle}>{n.subtitle}</Text>
            </View>
            
            <Text style={styles.time}>{n.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Menu Inferior */}
      <View style={styles.menuContainer}>
        <TouchableOpacity activeOpacity={0.6} onPress={irParaInicial} style={styles.menuItem}>
          <Text style={styles.menuIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={irParaCalendario} style={styles.menuItem}>
          <Text style={styles.menuIcon}>📅</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={irParaEL} style={styles.menuItem}>
          <Text style={styles.menuIcon}>🏆</Text>
        </TouchableOpacity>
        <View style={styles.menuItemActive}>
          <Text style={styles.menuIconActive}>🔔</Text>
        </View>
        <TouchableOpacity activeOpacity={0.6} onPress={irParaPerfil} style={styles.menuItem}>
          <Text style={styles.menuIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8FAFC' 
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

  // Cards
  notificationCard: { 
    backgroundColor: '#FFFFFF', 
    marginHorizontal: 20, 
    marginTop: 12, 
    padding: 16, 
    borderRadius: 18, 
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
  notificationIcon: { 
    width: 45, 
    height: 45, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  iconText: { 
    fontSize: 22 
  },
  textContainer: { 
    flex: 1, 
    flexShrink: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1565C0',
    marginRight: 8,
  },
  title: { 
    fontSize: 14, 
    fontWeight: '800', 
    color: '#0F172A' 
  },
  subtitle: { 
    fontSize: 12, 
    color: '#64748B', 
    marginTop: 2, 
    fontWeight: '500' 
  },
  time: { 
    fontSize: 11, 
    color: '#94A3B8', 
    fontWeight: '600', 
    marginLeft: 12,
    alignSelf: 'flex-start',
  },

  // Menu Inferior
  menuContainer: { 
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
  menuItemActive: { 
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