  // components/BottomMenu.js
  import React from 'react';
  import { View, Text, TouchableOpacity } from 'react-native';
  import { COLORS, SIZES } from './theme';

  export default function BottomMenu({ activeTab, onTabPress }) {
    const tabs = [
      { name: 'inicial', icon: '🏠' },
      { name: 'calendario', icon: '📅' },
      { name: 'el', icon: '🏆' },
      { name: 'notificacoes', icon: '🔔' },
      { name: 'perfil', icon: '👤' },
    ];

    return (
      <View style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 70,
        backgroundColor: COLORS.menuBg,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: COLORS.menuBorder,
      }}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            onPress={() => onTabPress(tab.name)}
            style={{ padding: 10 }}
          >
            <View
              style={{
                width: 45,
                height: 45,
                borderRadius: 22.5,
                backgroundColor: activeTab === tab.name ? COLORS.selectedItemBg
  : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: SIZES.iconSize }}>
                {tab.icon}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
