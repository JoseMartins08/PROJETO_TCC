import React, { useState } from 'react';

import TelaSplash from './telas/TelaSplash';
import TelaBoasVindas from './telas/TelaBoasVindas';
import TelaLogin from './telas/TelaLogin';
import TelaCadastro from './telas/TelaCadastro';
import TelaInicial from './telas/TelaInicial';
import TelaCalendario from './telas/TelaCalendario';
import TelaNotificacoes from './telas/TelaNotificacoes';
import TelaPerfil from './telas/TelaPerfil';
import TelaEL from './telas/TelaEL'; // Importando a nova tela Etec League

export default function App() {
  const [tela, setTela] = useState('splash');

  if (tela === 'splash') return <TelaSplash irParaBoasVindas={() => setTela('boasVindas')} />;
  
  if (tela === 'boasVindas') return <TelaBoasVindas irParaLogin={() => setTela('login')} irParaCadastro={() => setTela('cadastro')} />;

  // CORRIGIDO: Agora passa irParaBoasVindas em vez de 'voltar'
  if (tela === 'login') {
    return (
      <TelaLogin 
        irParaInicial={() => setTela('inicial')} 
        irParaCadastro={() => setTela('cadastro')} 
        irParaBoasVindas={() => setTela('boasVindas')} 
      />
    );
  }

  // CORRIGIDO: Agora passa irParaBoasVindas em vez de 'voltar'
  if (tela === 'cadastro') {
    return (
      <TelaCadastro 
        irParaInicial={() => setTela('inicial')} 
        irParaLogin={() => setTela('login')} 
        irParaBoasVindas={() => setTela('boasVindas')} 
      />
    );
  }

  if (tela === 'inicial') {
    return (
      <TelaInicial
        irParaCalendario={() => setTela('calendario')}
        irParaNotificacoes={() => setTela('notificacoes')}
        irParaPerfil={() => setTela('perfil')}
        irParaEL={() => setTela('el')} // Adicionado acesso à liga
        deslogar={() => setTela('boasVindas')}
      />
    );
  }

  if (tela === 'calendario') {
    return (
      <TelaCalendario 
        irParaInicial={() => setTela('inicial')} 
        irParaNotificacoes={() => setTela('notificacoes')}
        irParaPerfil={() => setTela('perfil')}
        irParaEL={() => setTela('el')} // Adicionado acesso à liga
      />
    );
  }

  if (tela === 'notificacoes') {
    return (
      <TelaNotificacoes 
        irParaInicial={() => setTela('inicial')} 
        irParaCalendario={() => setTela('calendario')}
        irParaPerfil={() => setTela('perfil')}
        irParaEL={() => setTela('el')} // Adicionado acesso à liga
      />
    );
  }

  if (tela === 'perfil') {
    return (
      <TelaPerfil 
        irParaInicial={() => setTela('inicial')}
        irParaCalendario={() => setTela('calendario')}
        irParaNotificacoes={() => setTela('notificacoes')}
        irParaEL={() => setTela('el')} // Configurado o clique real do menu do Perfil
        deslogar={() => setTela('boasVindas')}
      />
    );
  }

  if (tela === 'el') {
    return (
      <TelaEL 
        irParaInicial={() => setTela('inicial')} // Configura o botão voltar
        irParaCalendario={() => setTela('calendario')} // Configura o menu inferior
        irParaNotificacoes={() => setTela('notificacoes')} // Configura o menu inferior
        irParaPerfil={() => setTela('perfil')} // Configura o menu inferior
      />
    );
  }

  return <TelaSplash irParaBoasVindas={() => setTela('boasVindas')} />;
}