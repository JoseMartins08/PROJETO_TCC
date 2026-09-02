create database db_QuadraSync;
use db_QuadraSync;

create table usuario (
id_usuario int primary key auto_increment,
nome varchar(100) not null,
email varchar(100) not null unique,
senha varchar(255) not null,
perfil enum('aluno', 'organizador', 'administrador') not null,
curso varchar(50) not null,
turma varchar(20) not null,
ativo boolean not null default true
);

create table agenda_quadra (
id_agenda int primary key auto_increment,
data_utilizacao date not null,
hora_inicio time not null,
hora_fim time not null,
check (hora_inicio < hora_fim),
tipo enum('reserva', 'jogo', 'evento') not null,
status enum ('agendada', 'cancelada', 'concluida') not null
);

create table reserva (
id_reserva int primary key auto_increment,
id_agenda int not null,
id_usuario int not null,
finalidade varchar(100) not null,
observacao text,
foreign key (id_agenda) references agenda_quadra(id_agenda),
foreign key (id_usuario) references usuario(id_usuario)
);

create table evento (
id_evento int primary key auto_increment,
id_agenda int not null,
titulo varchar(100) not null,
descricao text,
tipo_evento enum('reforma', 'manutencao', 'palestra', 'outro') not null,
foreign key (id_agenda) references agenda_quadra(id_agenda)
);

create table campeonato (
id_campeonato int primary key auto_increment,
nome varchar(100) not null,
modalidade enum('futsal', 'volei', 'basquete') not null,
categoria enum('feminino', 'masculino', 'misto') not null,
data_inicio date not null,
data_fim date,
check (
	data_fim is null
    or data_fim >= data_inicio
),
status enum('planejado', 'andamento', 'encerrado') not null
);

create table equipe (
id_equipe int primary key auto_increment,
nome varchar(100) not null
);

create table campeonato_equipe (
id_campeonato int not null,
id_equipe int not null,
primary key (id_campeonato, id_equipe),
foreign key (id_campeonato) references campeonato(id_campeonato),
foreign key (id_equipe) references equipe(id_equipe)
);

create table jogo (
id_jogo int primary key auto_increment,
id_agenda int not null,
id_campeonato int not null,
id_equipe1 int not null,
id_equipe2 int not null,
fase varchar(50) not null,
placar_equipe1 int,
placar_equipe2 int,
status enum('agendado', 'adiado', 'em_andamento', 'finalizado', 'cancelado') not null,
check (id_equipe1 <> id_equipe2),
foreign key (id_agenda) references agenda_quadra(id_agenda),
foreign key (id_campeonato) references campeonato(id_campeonato),
foreign key (id_equipe1) references equipe(id_equipe),
foreign key (id_equipe2) references equipe(id_equipe)
);

create table notificacao (
id_notificacao int primary key auto_increment,
id_usuario int not null,
titulo varchar(100) not null,
mensagem text not null,
data_envio datetime not null,
visualizada boolean not null default false,
foreign key (id_usuario) references usuario(id_usuario)
);

show tables;