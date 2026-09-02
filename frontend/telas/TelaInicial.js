import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// Dados mockados movidos para fora da função (melhora a performance do app)
const NEWS = [
  {
    id: 1,
    tag: "ETEC LEAGUE",
    tagColor: "#D97706",
    title: "Fase de grupos começa semana que vem",
    sub: "8 times confirmados · 24 jogadores inscritos",
    icon: "🏆",
    accent: "#D97706",
    tagBg: '#FEF3C7'
  },
  {
    id: 2,
    tag: "AVISO",
    tagColor: "#DC2626",
    title: "Quadra fechada sexta-feira à tarde",
    sub: "Manutenção programada · 13h – 17h",
    icon: "⚠️",
    accent: "#DC2626",
    tagBg: '#FEE2E2'
  },
  {
    id: 3,
    tag: "NOVIDADE",
    tagColor: "#059669",
    title: "Novo horário das 7h30 liberado",
    sub: "Disponível para reservas · A partir de hoje",
    icon: "🎉",
    accent: "#059669",
    tagBg: '#D1FAE5'
  },
];

export default function TelaInicial({
   irParaCalendario, 
   irParaNotificacoes,
   irParaPerfil,
   irParaEL
}) {
   const [newsIndex, setNewsIndex] = useState(0);

   // Array de ações agora inclui a função de navegação direto no objeto
   const ACTIONS = [
     { label: "Nova Reserva", sub: "Agendar horário", icon: "📅", bg: "#1565C0", action: irParaCalendario },
     { label: "Etec League", sub: "Jogos da liga", icon: "🏆", bg: "#D97706", action: irParaEL },
     { label: "Histórico", sub: "Minhas reservas", icon: "🕑", bg: "#7C3AED", action: irParaPerfil },
     { label: "Calendário", sub: "Disponibilidade", icon: "🗓️", bg: "#0891B2", action: irParaCalendario },
   ];

   const RESERVATIONS = [
     { sport: "Futsal", icon: "⚽", date: "03/03", time: "14:30 – 15:30", status: "APROVADA", ok: true },
     { sport: "Basquete", icon: "🏀", date: "05/03", time: "16:00 – 17:00", status: "PENDENTE", ok: false },
   ];

   // Rotação de notícias a cada 4s
   useEffect(() => {
      const interval = setInterval(() => {
         setNewsIndex((prev) => (prev + 1) % NEWS.length);
      }, 4000);
      return () => clearInterval(interval);
   }, []);

   const currentNews = NEWS[newsIndex];

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
         
         <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
         >
            {/* Cabeçalho */}
            <View style={styles.header}>
               <View style={styles.headerContent}>
                  <Text style={styles.welcomeText}>Bem-vindo de volta 👋</Text>
                  <Text style={styles.userName}>OLÁ, [ALUNO]!</Text>
                  <Text style={styles.userSubtext}>QuadraSync · ETEC</Text>
               </View>
               <View style={styles.avatarContainer}>
                  <View style={styles.avatarBg}>
                     <Text style={styles.avatarText}>👤</Text>
                  </View>
               </View>
            </View>

            {/* Estatísticas */}
            <View style={styles.statsContainer}>
               <View style={styles.statCard}>
                  <Text style={styles.statIcon}>📅</Text>
                  <Text style={styles.statNumber}>3</Text>
                  <Text style={styles.statLabel}>Reservas</Text>
               </View>
               <View style={styles.statCard}>
                  <Text style={styles.statIcon}>👥</Text>
                  <Text style={styles.statNumber}>1</Text>
                  <Text style={styles.statLabel}>Time Ativo</Text>
               </View>
               <View style={styles.statCard}>
                  <Text style={styles.statIcon}>⚽</Text>
                  <Text style={styles.statNumber}>5</Text>
                  <Text style={styles.statLabel}>Jogos</Text>
               </View>
            </View>

            {/* Live Banner */}
            <View style={styles.liveBanner}>
               <View style={styles.liveBannerContent}>
                  <View style={styles.liveBannerLeft}>
                     <View style={styles.liveBannerDot} />
                     <Text style={styles.liveBannerText}>AO VIVO</Text>
                  </View>
                  <View style={styles.liveBannerCenter}>
                     <Text style={styles.liveBannerTitle}>Futsal · 404 vs AutoBots</Text>
                     <Text style={styles.liveBannerSubtitle}>Quadra Principal · 2º tempo</Text>
                  </View>
                  <View style={styles.liveBannerRight}>
                     <Text style={styles.liveBannerScore}>2–1</Text>
                     <Text style={styles.liveBannerTime}>12'</Text>
                  </View>
               </View>
            </View>

            {/* Notícias */}
            <View style={styles.newsSection}>
               <Text style={styles.sectionTitle}>Notícias</Text>
               <View style={styles.newsCard}>
                  <View style={styles.newsHeader}>
                     <View style={[styles.newsTag, { backgroundColor: currentNews.tagBg }]}>
                        <Text style={[styles.newsTagText, { color: currentNews.tagColor }]}>{currentNews.tag}</Text>
                     </View>
                     <View style={[styles.newsIcon, { backgroundColor: `${currentNews.accent}15`, borderColor: `${currentNews.accent}25` }]}>
                        <Text style={styles.newsIconText}>{currentNews.icon}</Text>
                     </View>
                  </View>
                  <Text style={styles.newsTitle}>{currentNews.title}</Text>
                  <Text style={styles.newsSubtitle}>{currentNews.sub}</Text>
               </View>
               <View style={styles.newsNavigator}>
                  {NEWS.map((_, i) => (
                     <View
                        key={i}
                        style={[
                           styles.newsDot,
                           i === newsIndex && styles.newsDotActive,
                        ]}
                     />
                  ))}
               </View>
            </View>

           {/* Ações Rápidas */}
            <View style={styles.actionsSection}>
              <Text style={styles.sectionTitle}>Ações Rápidas</Text>
              <View style={styles.actionsGrid}>
                  {ACTIONS.map((action, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.7}
                        onPress={action.action}
                        style={[styles.actionCard, { backgroundColor: action.bg }]}
                    >
                        <View style={styles.actionIconContainer}>
                          <Text style={styles.actionIcon}>{action.icon}</Text>
                        </View>
                        <View style={styles.actionTextContainer}>
                          <Text style={styles.actionTitle}>{action.label}</Text>
                          <Text style={styles.actionSubtitle}>{action.sub}</Text>
                        </View>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>

            {/* Próximas Reservas */}
            <View style={styles.reservationsSection}>
               <Text style={styles.sectionTitle}>Próximas Reservas</Text>
               {RESERVATIONS.map((res, index) => (
                  <View key={index} style={styles.reservationCard}>
                     <View style={[styles.reservationBar, { backgroundColor: res.ok ? '#059669' : '#D97706' }]} />
                     <View style={styles.reservationContent}>
                        <View style={styles.reservationIconContainer}>
                           <Text style={styles.reservationIconText}>{res.icon}</Text>
                        </View>
                        <View style={styles.reservationDetails}>
                           <Text style={styles.reservationSport}>{res.sport}</Text>
                           <Text style={styles.reservationDateTime}>
                              🕐 {res.date} · {res.time}
                           </Text>
                        </View>
                        <View style={styles.reservationStatus}>
                           <Text style={[
                              styles.reservationStatusText,
                              res.ok ? styles.statusApproved : styles.statusPending,
                           ]}>
                              {res.status}
                           </Text>
                        </View>
                     </View>
                  </View>
               ))}
            </View>
         </ScrollView>

         {/* Menu Inferior */}
         <View style={styles.menuContainer}>
            <View style={styles.menuItemActive}>
               <Text style={styles.menuIconActive}>🏠</Text>
            </View>

            <TouchableOpacity activeOpacity={0.6} onPress={irParaCalendario} style={styles.menuItem}>
               <Text style={styles.menuIcon}>📅</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} onPress={irParaEL} style={styles.menuItem}>
               <Text style={styles.menuIcon}>🏆</Text>
            </TouchableOpacity>

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
      backgroundColor: '#F8FAFC',
   },
   scrollContent: {
      paddingBottom: 100, // Espaço para o menu inferior não cobrir o conteúdo
   },

   // Cabeçalho
   header: {
      backgroundColor: '#1565C0', // Azul padronizado
      paddingTop: 50, // Espaço para a barra de status/notch
      paddingBottom: 30,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
   },
   headerContent: {
      alignItems: 'flex-start',
   },
   welcomeText: {
      color: '#93C5FD',
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: 2,
      textTransform: 'uppercase',
      marginBottom: 4,
   },
   userName: {
      color: '#FFFFFF',
      fontSize: 24, // Levemente menor para não quebrar em telas pequenas
      fontWeight: '800',
      letterSpacing: -0.5,
      lineHeight: 28,
      marginBottom: 4,
   },
   userSubtext: {
      color: '#BFDBFE',
      fontSize: 12,
      fontWeight: '600',
   },
   avatarContainer: {
      marginLeft: 'auto',
   },
   avatarBg: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: 'rgba(255,255,255,0.15)',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.25)',
   },
   avatarText: {
      fontSize: 22,
   },

   // Estatísticas
   statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginTop: -15, // Puxa os cards para cima criando um efeito sobreposto ao header
   },
   statCard: {
      backgroundColor: '#FFFFFF',
      width: '31%',
      padding: 12,
      borderRadius: 16,
      alignItems: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
   },
   statIcon: { fontSize: 24, marginBottom: 6 },
   statNumber: { fontSize: 22, fontWeight: '800', color: '#1565C0' },
   statLabel: { fontSize: 10, color: '#64748B', textAlign: 'center', fontWeight: '600' },

   // Live Banner
   liveBanner: {
      backgroundColor: '#0D47A1', // Azul mais escuro para destacar do header
      borderRadius: 20,
      padding: 16,
      marginHorizontal: 20,
      marginTop: 24,
      elevation: 4,
      shadowColor: '#0D47A1',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
   },
   liveBannerContent: { flexDirection: 'row', alignItems: 'center' },
   liveBannerLeft: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
   liveBannerDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4ADE80', marginRight: 6 },
   liveBannerText: { color: '#A7F3D0', fontSize: 10, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase' },
   liveBannerCenter: { flex: 1 },
   liveBannerTitle: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', marginBottom: 2 },
   liveBannerSubtitle: { color: '#BFDBFE', fontSize: 11, fontWeight: '500' },
   liveBannerRight: { alignItems: 'flex-end' },
   liveBannerScore: { color: '#FFFFFF', fontSize: 22, fontWeight: '900', letterSpacing: -0.5 },
   liveBannerTime: { color: '#93C5FD', fontSize: 10, fontWeight: '700' },

   // Seções Gerais
   newsSection: { marginTop: 28, marginHorizontal: 20 },
   actionsSection: { marginTop: 28, marginHorizontal: 20 },
   reservationsSection: { marginTop: 28, marginHorizontal: 20, marginBottom: 10 },
   sectionTitle: { fontSize: 16, fontWeight: '700', color: '#334155', marginBottom: 12 },

   // Notícias
   newsCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 22,
      padding: 18,
      elevation: 3,
      borderWidth: 1,
      borderColor: '#E2E8F0',
   },
   newsHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
   newsTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 99 },
   newsTagText: { fontSize: 10, fontWeight: '900', letterSpacing: 1 },
   newsIcon: { width: 44, height: 44, borderRadius: 14, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
   newsIconText: { fontSize: 22 },
   newsTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A', marginBottom: 4, lineHeight: 20 },
   newsSubtitle: { fontSize: 12, color: '#64748B', fontWeight: '500' },
   newsNavigator: { marginTop: 12, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
   newsDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#CBD5E1', marginHorizontal: 3 },
   newsDotActive: { backgroundColor: '#1565C0', width: 18, height: 6, borderRadius: 99 },

   // Ações Rápidas
   actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
   actionCard: {
      width: '48%',
      borderRadius: 22,
      padding: 16,
      marginBottom: 12,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
   },
   actionIconContainer: { marginBottom: 12 },
   actionIcon: { fontSize: 28 },
   actionTextContainer: { alignItems: 'flex-start' },
   actionTitle: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
   actionSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 },

   // Próximas Reservas
   reservationCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 2,
      borderWidth: 1,
      borderColor: '#E2E8F0',
      overflow: 'hidden',
   },
   reservationBar: { width: 5, height: '100%' },
   reservationContent: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
   reservationIconContainer: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
   reservationIconText: { fontSize: 22 },
   reservationDetails: { flex: 1 },
   reservationSport: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 2 },
   reservationDateTime: { fontSize: 12, color: '#64748B', fontWeight: '500' },
   reservationStatus: { marginLeft: 'auto' },
   reservationStatusText: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 99, fontSize: 10, fontWeight: '800', overflow: 'hidden' },
   statusApproved: { backgroundColor: '#D1FAE5', color: '#065F46' },
   statusPending: { backgroundColor: '#FEF3C7', color: '#92400E' },

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
      borderTopLeftRadius: 20, // Cantos arredondados superiores
      borderTopRightRadius: 20,
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
   },
   menuItem: { width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center' },
   menuItemActive: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center' },
   menuIcon: { fontSize: 24 },
   menuIconActive: { fontSize: 24 },
});