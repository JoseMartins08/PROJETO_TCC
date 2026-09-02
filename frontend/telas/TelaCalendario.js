import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function TelaCalendario({ 
  irParaInicial, 
  irParaNotificacoes,
  irParaPerfil,
  irParaEL 
}) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const currentDate = new Date(2026, 5, 16); 
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth(); 
  const currentYear = currentDate.getFullYear();

  const daysInMonth = 30;
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const generateMatrix = () => {
    const matrix = [];
    let week = [];

    for (let i = 0; i < firstDayIndex; i++) {
      week.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        matrix.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      matrix.push(week);
    }

    return matrix;
  };

  const calendarMatrix = generateMatrix();

  const timeSlots = ['07:00', '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
  const slotStatus = {
    '07:00': 'available', '08:00': 'available', '09:00': 'blocked',
    '10:00': 'available', '11:00': 'available', '14:00': 'reserved',
    '15:00': 'available', '16:00': 'available',
  };

  const statusStyles = {
    available: { color: '#059669', bgColor: '#D1FAE5', label: 'Disponível' },
    blocked: { color: '#DC2626', bgColor: '#FEE2E2', label: 'Bloqueado' },
    reserved: { color: '#D97706', bgColor: '#FEF3C7', label: 'Reservado' },
  };

  const handleBookSlot = () => {
    if (selectedSlot !== null) {
      setShowBooking(true);
      setTimeout(() => {
        setBookingConfirmed(true);
        setShowBooking(false);
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Calendário</Text>
            <Text style={styles.headerSubtitle}>Reserve sua quadra</Text>
          </View>
          <TouchableOpacity activeOpacity={0.6} onPress={irParaInicial} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
        </View>

        {/* Card do Calendário */}
        <View style={styles.calendarCard}>
          <View style={styles.monthContainer}>
            <Text style={styles.monthText}>Junho 2026</Text>
          </View>

          {/* Cabeçalho dos Dias da Semana */}
          <View style={styles.weekdays}>
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d) => (
              <Text key={d} style={styles.weekday}>{d}</Text>
            ))}
          </View>

          {/* Renderização em Linhas */}
          <View style={styles.matrixGrid}>
            {calendarMatrix.map((week, weekIndex) => (
              <View key={`week-${weekIndex}`} style={styles.weekRow}>
                {week.map((day, dayIndex) => {
                  if (day === null) {
                    return <View key={`empty-${dayIndex}`} style={styles.dayButtonEmpty} />;
                  }

                  const isToday = day === currentDay;
                  const isSelected = day === selectedDay;
                  const isPast = day < currentDay && !isSelected;

                  return (
                    <TouchableOpacity
                      key={`day-${day}`}
                      activeOpacity={0.7}
                      disabled={isPast}
                      onPress={() => {
                        setSelectedDay(day);
                        setSelectedSlot(null);
                      }}
                      style={[
                        styles.dayButton,
                        isToday && styles.dayToday,
                        isSelected && styles.daySelected,
                        isPast && styles.dayPast,
                      ]}
                    >
                      <Text style={[
                        styles.dayNumber,
                        isToday && styles.dayNumberToday,
                        isSelected && styles.dayNumberSelected,
                        isPast && styles.dayNumberPast,
                      ]}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </View>

        {/* Dia Selecionado */}
        {selectedDay !== null && (
          <View style={styles.selectedDayInfo}>
            <Text style={styles.selectedDayLabel}>Dia Selecionado</Text>
            <Text style={styles.selectedDayDate}>
              {selectedDay < 10 ? `0${selectedDay}` : selectedDay} de Junho, 2026
            </Text>
          </View>
        )}

        {/* Seção de Horários */}
        {selectedDay !== null && (
          <View style={styles.timeSection}>
            <Text style={styles.sectionTitle}>Horários Disponíveis</Text>
            <View style={styles.timeSlotsContainer}>
              {timeSlots.map((time, index) => {
                const status = slotStatus[time] || 'available';
                const currentStatusStyle = statusStyles[status];
                const isSelected = selectedSlot === index;

                return (
                  <TouchableOpacity
                    key={time}
                    activeOpacity={0.7}
                    disabled={status !== 'available'}
                    onPress={() => setSelectedSlot(isSelected ? null : index)}
                    style={[
                      styles.timeSlot,
                      { backgroundColor: currentStatusStyle.bgColor },
                      isSelected && styles.timeSlotSelected,
                      status !== 'available' && styles.timeSlotUnavailable,
                    ]}
                  >
                    <Text style={[
                      styles.timeText,
                      { color: isSelected ? '#1565C0' : '#0F172A' },
                      status !== 'available' && styles.timeTextUnavailable,
                    ]}>
                      {time}
                    </Text>
                    
                    <View style={styles.statusIndicator}>
                      <View style={[styles.statusDot, { backgroundColor: currentStatusStyle.color }]} />
                      <Text style={[styles.statusLabel, { color: currentStatusStyle.color }]}>
                        {currentStatusStyle.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Botão Reservar */}
            {selectedSlot !== null && (slotStatus[timeSlots[selectedSlot]] || 'available') === 'available' && (
              <TouchableOpacity activeOpacity={0.8} onPress={handleBookSlot} style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Confirmar Reserva</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* Menu Inferior */}
      <View style={styles.menuContainer}>
        <TouchableOpacity activeOpacity={0.6} onPress={irParaInicial} style={styles.menuItem}><Text style={styles.menuIcon}>🏠</Text></TouchableOpacity>
        <View style={styles.menuItemActive}><Text style={styles.menuIconActive}>📅</Text></View>
        <TouchableOpacity activeOpacity={0.6} onPress={irParaEL} style={styles.menuItem}><Text style={styles.menuIcon}>🏆</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={irParaNotificacoes} style={styles.menuItem}><Text style={styles.menuIcon}>🔔</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={irParaPerfil} style={styles.menuItem}><Text style={styles.menuIcon}>👤</Text></TouchableOpacity>
      </View>

      {/* Modal de Confirmação (Movido para fora do ScrollView para cobrir tudo) */}
      {bookingConfirmed && (
        <View style={styles.confirmationModal}>
          <View style={styles.confirmationContent}>
            <View style={styles.successIconCircle}><Text style={styles.confirmationIcon}>✓</Text></View>
            <Text style={styles.confirmationTitle}>Reserva Enviada!</Text>
            <Text style={styles.confirmationText}>
              Sua solicitação para o dia {selectedDay}/06 foi encaminhada e está aguardando aprovação.
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setBookingConfirmed(false);
                setSelectedDay(null);
                setSelectedSlot(null);
              }}
              style={styles.confirmationButton}
            >
              <Text style={styles.confirmationButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { paddingBottom: 110 },
  
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
  headerContent: { alignItems: 'flex-start' },
  headerTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
  headerSubtitle: { color: '#BFDBFE', fontSize: 13, fontWeight: '500', marginTop: 2 },
  backButton: { backgroundColor: 'rgba(255, 255, 255, 0.15)', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 12 },
  backButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },

  // Card do Calendário
  calendarCard: { backgroundColor: '#FFFFFF', marginHorizontal: 20, marginTop: -15, borderRadius: 22, padding: 16, elevation: 4, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 4 },
  monthContainer: { alignItems: 'center', marginBottom: 16 },
  monthText: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  
  // Grid do Calendário
  weekdays: { flexDirection: 'row', marginBottom: 12 },
  weekday: { flex: 1, fontWeight: '700', color: '#64748B', fontSize: 12, textAlign: 'center' },
  matrixGrid: { flexDirection: 'column' },
  weekRow: { flexDirection: 'row', marginVertical: 4 },
  
  // Usando flex: 1 para os dias se ajustarem a qualquer tela
  dayButton: { flex: 1, aspectRatio: 1, marginHorizontal: 2, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F5F9' },
  dayButtonEmpty: { flex: 1, marginHorizontal: 2, aspectRatio: 1 },
  dayToday: { borderWidth: 2, borderColor: '#1565C0', backgroundColor: '#FFFFFF' },
  daySelected: { backgroundColor: '#1565C0', elevation: 3 },
  dayPast: { opacity: 0.2, backgroundColor: 'transparent' },
  dayNumber: { fontSize: 14, fontWeight: '600', color: '#334155' },
  dayNumberToday: { color: '#1565C0', fontWeight: '800' },
  dayNumberSelected: { color: '#FFFFFF', fontWeight: '800' },
  dayNumberPast: { color: '#94A3B8' },

  // Dia Selecionado
  selectedDayInfo: { alignItems: 'center', marginTop: 24, marginBottom: 8 },
  selectedDayLabel: { fontSize: 11, color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  selectedDayDate: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginTop: 2 },

  // Seção de Horários
  timeSection: { marginHorizontal: 20, marginTop: 16 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#334155', marginBottom: 12 },
  timeSlotsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  timeSlot: { width: '48%', padding: 14, borderRadius: 18, marginBottom: 12, alignItems: 'center', borderWidth: 2, borderColor: 'transparent', elevation: 1 },
  timeSlotSelected: { borderColor: '#1565C0', backgroundColor: '#E3F2FD' },
  timeSlotUnavailable: { opacity: 0.5 },
  timeText: { fontSize: 16, fontWeight: '800' },
  timeTextUnavailable: { color: '#64748B' },
  statusIndicator: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  statusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  statusLabel: { fontSize: 11, fontWeight: '700' },

  // Botão Reservar
  bookButton: { backgroundColor: '#1565C0', paddingVertical: 15, borderRadius: 18, alignItems: 'center', marginTop: 12, elevation: 4, shadowColor: '#1565C0', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 5 },
  bookButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },

  // Modal
  confirmationModal: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', justifyContent: 'center', alignItems: 'center', zIndex: 100, elevation: 10 },
  confirmationContent: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 24, alignItems: 'center', width: '85%', maxWidth: 320, elevation: 10 },
  successIconCircle: { backgroundColor: '#D1FAE5', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  confirmationIcon: { fontSize: 28, color: '#059669', fontWeight: '800' },
  confirmationTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 8 },
  confirmationText: { fontSize: 13, color: '#64748B', textAlign: 'center', marginBottom: 24, lineHeight: 18, fontWeight: '500' },
  confirmationButton: { backgroundColor: '#1565C0', paddingVertical: 14, borderRadius: 16, alignItems: 'center', width: '100%' },
  confirmationButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },

  // Menu Inferior
  menuContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: '#FFFFFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  menuItem: { width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center' },
  menuItemActive: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center' },
  menuIcon: { fontSize: 24 },
  menuIconActive: { fontSize: 24 },
});