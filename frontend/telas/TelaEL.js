import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';

export default function TelaEL({ 
  irParaInicial,
  irParaNotificacoes,
  irParaCalendario,
  irParaPerfil
}) {
  // Menu options
  const menuOptions = [
    { id: 1, label: 'Basquete Masc' },
    { id: 2, label: 'Basquete Fem' },
    { id: 3, label: 'Futsal Masc' },
    { id: 4, label: 'Futsal Fem' },
    { id: 5, label: 'Vôlei' },
  ];

  // Mock data
  const mockData = {
    1: { 
      past: [
        { id: 1, opponent: '404 x All Blacks', date: '20/04', time: '12:00', result: '25-0'},
        { id: 2, opponent: 'Picadilhas x All Blacks', date: '22/04', time: '12:00', result: '36-8' },
        { id: 3, opponent: '404 x IDF', date: '27/04', time: '12:00', result: '31-6' },
      ],
      upcoming: [
        { id: 4, opponent: '404 x Picadilhas', date: '05/04', time: '12:00'},
        { id: 5, opponent: '404 x Dedo de Gorila', date: '12/03', time: '12:00' },
        { id: 6, opponent: 'Dedo de Gorila x IDF', date: '19/03', time: '12:00' },
      ],
    },
    2: { 
      past: [
        { id: 1, opponent: 'Athenas x Venosas', date: '19/02', time: '12:00', result: '6-4' },
        { id: 2, opponent: 'Venosas x Devintetes', date: '14/02', time: '12:00', result: '8-6' },
      ],
      upcoming: [
        { id: 3, opponent: '404 x Athenas', date: '04/03', time: '12:00' },
        { id: 4, opponent: 'Devintetes x 404', date: '11/03', time: '12:00' },
        { id: 5, opponent: 'Athenas x Devintetes', date: '18/03', time: '12:00' },
      ],
    },
    3: { 
      past: [
        { id: 1, opponent: 'Al Tha Kadao x Alvorada', date: '18/02', time: '12:00', result: '3-1' },
        { id: 2, opponent: 'Atl. Busão x Atl. Cubano', date: '11/02', time: '12:00', result: '2-2' },
        { id: 3, opponent: 'AutoBots x Bora Bola', date: '04/02', time: '12:00', result: '4-0' },
      ],
      upcoming: [
        { id: 4, opponent: 'Felinos x PDS', date: '03/03', time: '12:00' },
        { id: 5, opponent: 'Picadilhas x Seita', date: '10/03', time: '12:00' },
        { id: 6, opponent: 'Tribo x Al Tha Kadao', date: '17/03', time: '12:00' },
      ],
    },
    4: { 
      past: [
        { id: 1, opponent: '404 x Athenas', date: '17/02', time: '12:00', result: '2-0' },
        { id: 2, opponent: 'Devintetes x Keméticas', date: '10/02', time: '12:00', result: '1-1' },
      ],
      upcoming: [
        { id: 3, opponent: 'Vencesletes x 404', date: '02/03', time: '12:00' },
        { id: 4, opponent: 'Athenas x Devintetes', date: '09/03', time: '12:00' },
        { id: 5, opponent: 'Keméticas x Vencesletes', date: '16/03', time: '12:00' },
      ],
    },
    5: { 
      past: [
        { id: 1, opponent: '404 x Picadilhas', date: '21/02', time: '12:00', result: '2-0' },
        { id: 2, opponent: 'Alvorada x Zakizados', date: '13/02', time: '12:00', result: '2-1' },
        { id: 3, opponent: 'Vasco da Cama x AutoBots', date: '06/02', time: '12:00', result: '0-2' },
      ],
      upcoming: [
        { id: 4, opponent: '404 x Tribo', date: '07/03', time: '12:00' },
        { id: 5, opponent: 'Fúria x Me. de Hambúrguer', date: '14/03', time: '12:00' },
        { id: 6, opponent: 'Picadilhas x Alvorada', date: '21/03', time: '12:00' },
      ],
    },
  };

  const [selectedOption, setSelectedOption] = useState(menuOptions[0].id);
  const getData = () => mockData[selectedOption] || { past: [], upcoming: [] };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={irParaInicial}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Etec League</Text>
          {/* View fantasma para alinhar o título ao centro */}
          <View style={{ width: 70 }} /> 
        </View>

        {/* Menu Tabs Horizontal */}
        <View style={styles.menuContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.menuScrollContent}
          >
            {menuOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                activeOpacity={0.7}
                onPress={() => setSelectedOption(option.id)}
                style={[
                  styles.menuButton,
                  selectedOption === option.id && styles.menuButtonActive,
                ]}
              >
                <Text style={[
                  styles.menuButtonText,
                  selectedOption === option.id && styles.menuButtonTextActive,
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Games Section */}
        <View style={styles.gamesSection}>
          {getData().past.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Jogos Passados</Text>
              <View style={styles.gamesList}>
                {getData().past.map((game) => (
                  <View key={game.id} style={styles.gameCard}>
                    <View style={styles.gameInfo}>
                      <Text style={styles.gameOpponent}>{game.opponent}</Text>
                      <Text style={styles.gameDateTime}>
                        {game.date} • {game.time}
                      </Text>
                    </View>
                    <View style={styles.gameResult}>
                      <Text style={styles.gameResultText}>{game.result}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {getData().upcoming.length > 0 && (
            <View style={styles.upcomingSection}>
              <Text style={styles.sectionTitle}>Próximos Jogos</Text>
              <View style={styles.gamesList}>
                {getData().upcoming.map((game) => (
                  <View key={game.id} style={styles.gameCard}>
                    <View style={styles.gameInfo}>
                      <Text style={styles.gameOpponent}>{game.opponent}</Text>
                      <Text style={styles.gameDateTime}>
                        {game.date} • {game.time}
                      </Text>
                    </View>
                    <View style={styles.gameStatus}>
                      <Text style={styles.gameStatusText}>Agendado</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {(getData().past.length === 0 && getData().upcoming.length === 0) && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyTitle}>Sem jogos cadastrados</Text>
              <Text style={styles.emptyText}>Não há jogos para esta modalidade no momento.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Menu Inferior */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity activeOpacity={0.6} onPress={irParaInicial} style={styles.menuItem}>
          <Text style={styles.menuIcon}>🏠</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6} onPress={irParaCalendario} style={styles.menuItem}>
          <Text style={styles.menuIcon}>📅</Text>
        </TouchableOpacity>

        <View style={styles.menuItemSelected}>
          <Text style={styles.menuIconActive}>🏆</Text>
        </View>

        <TouchableOpacity activeOpacity={0.6} onPress={irParaNotificacoes} style={styles.menuItem}>
          <Text style={styles.menuIcon}>🔔</Text>
        </TouchableOpacity>

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
    backgroundColor: '#000000', 
  },
  scrollContent: {
    paddingBottom: 100, 
  },
  
  // Header
  header: {
    backgroundColor: '#000000', 
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // Menu Tabs
  menuContainer: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  menuScrollContent: {
    paddingHorizontal: 20,
  },
  menuButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#222222',
  },
  menuButtonActive: {
    backgroundColor: '#4CAF50', 
    borderColor: '#4CAF50',
  },
  menuButtonText: {
    color: '#AAAAAA',
    fontSize: 13,
    fontWeight: '600',
  },
  menuButtonTextActive: {
    color: '#000000', 
    fontWeight: '800',
  },

  // Games Section
  gamesSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  
  // Cards
  gameCard: {
    backgroundColor: '#111111',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222222',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Alinha verticalmente texto e resultado
  },
  gameInfo: {
    flex: 1,
    paddingRight: 12,
  },
  gameOpponent: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  gameDateTime: {
    fontSize: 13,
    color: '#888888',
    fontWeight: '500',
  },
  
  // Resultado (Verde)
  gameResult: {
    minWidth: 70,
    height: 36,
    paddingHorizontal: 10,
    borderRadius: 18,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameResultText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '900',
  },
  
  // Status Agendado (Azul para diferenciar e conectar com o app)
  gameStatus: {
    minWidth: 70,
    height: 36,
    paddingHorizontal: 10,
    borderRadius: 18,
    backgroundColor: '#1565C0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameStatusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  
  upcomingSection: {
    marginTop: 28,
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
  },

  // Menu Inferior
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#0A0A0A',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
  },
  menuItem: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemSelected: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#4CAF50', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
  },
  menuIconActive: {
    fontSize: 24,
  },
});