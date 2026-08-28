<div align="center">

<img src="./docs/assets/logo-quadrasync.png" alt="Logotipo QuadraSync" width="180"/>

### Reserve. Organize. Jogue.

Sistema mobile para **reserva de quadras esportivas** e **gerenciamento de campeonatos internos**.

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](#)
[![TCC](https://img.shields.io/badge/projeto-TCC%202026-blue)](#)
[![Licença](https://img.shields.io/badge/licença-MIT-green)](#)

</div>

---

## 📖 Sobre o projeto

O **QuadraSync** nasceu de um problema simples e recorrente dentro da escola: a dificuldade de organizar o uso das quadras esportivas e os campeonatos internos entre turmas, muitas vezes controlados de forma manual, por grupos de mensagem ou planilhas soltas.

Nosso objetivo é oferecer uma plataforma centralizada onde alunos e responsáveis possam:

- 📅 **Reservar quadras** de forma rápida, evitando conflitos de horário;
- 🏆 **Acompanhar campeonatos internos** (Etec League), com chaveamento, resultados e classificação;
- 📱 Acessar tudo isso de forma simples, tanto pelo **celular** quanto pelo **computador**;
- 🔔 Receber notificações sobre reservas, jogos e atualizações.

Este projeto é o **Trabalho de Conclusão de Curso (TCC)** da turma **3°DS-A**, do curso Técnico em Desenvolvimento de Sistemas.

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 🔐 Login e cadastro | Autenticação de alunos e organizadores |
| 📆 Reserva de quadras | Agendamento com verificação de disponibilidade em tempo real |
| 🏅 Campeonatos internos | Criação de chaves, partidas e ranking das equipes |
| 📊 Painel administrativo | Gestão de quadras, horários e usuários |
| 🌙 Identidade visual | Interface com tema verde escuro e animações |

---

## 🛠️ Tecnologias utilizadas

<div align="center">

![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

</div>

- **Frontend Mobile:** React Native (Expo)
- **Backend:** PHP / Node.js
- **Geração de documentação:** Node.js + biblioteca `docx`
- **Padrão de documentação acadêmica:** ABNT

---

## 📂 Estrutura do projeto

```
QuadraSync/
├── docs/                  # Documentação do TCC (ABNT, casos de teste, requisitos)
│   ├── assets/            # Logotipo e imagens do projeto
│   └── requisitos/        # Requisitos funcionais (RF) e casos de teste (CT)
├── mobile/                # Aplicativo mobile (React Native + Expo)
│   ├── src/
│   │   ├── screens/       # Telas (login, home, reservas, campeonatos...)
│   │   ├── components/    # Componentes reutilizáveis
│   │   └── assets/        # Imagens e ícones do app
│   └── app.json
├── backend/                # API e regras de negócio
│   ├── src/
│   └── database/          # Scripts e modelagem do banco de dados
├── README.md
└── LICENSE
```

---

## 🧭 Metodologia

O desenvolvimento do QuadraSync segue a metodologia ágil **Scrum**, adaptada à rotina escolar da equipe:

- 🔁 **Sprints** curtas, com entregas incrementais alinhadas ao cronograma do TCC;
- 📋 **Backlog** organizado por requisitos funcionais (RF) e casos de teste (CT);
- 🗣️ **Reuniões periódicas** com a orientadora do projeto para validação das entregas;
- 📝 Documentação técnica e acadêmica seguindo as normas **ABNT** (fonte Arial 12, texto justificado, margens específicas);
- ✅ Testes documentados e formalizados a cada etapa, garantindo rastreabilidade entre requisitos e funcionalidades.

---

## 👥 Nossa equipe

<div>

| Papel | Integrante |
|---|---|
| 👑 **Líder / Product Owner (PO)** | **José Martins** |
| 🧩 **Scrum Master / Dev** | **Gabriel Silva** |
| 📚 **Documentarista / Dev** | **Miguel Faria** |

</div>

**Orientadora:** Profª. Patrícia M. Simões Viana

**Instituição:** ETEC Professora Ilza Nascimento Pintus — Curso Técnico em Desenvolvimento de Sistemas (3°DS-A)

---

## 🚀 Como executar o projeto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/quadrasync.git

# Acesse a pasta do mobile
cd quadrasync/mobile

# Instale as dependências
npm install

# Rode o projeto com o Expo
npx expo start
```

> ⚠️ Instruções detalhadas do backend serão adicionadas conforme o desenvolvimento avançar.

---

<div align="center">

Feito com 🩵 pela equipe **QuadraSync** — TCC 2026

</div>
