# Desafio Angular - Sistema de Petshop

Este projeto consiste no frontend de um sistema de gerenciamento para petshops

## Módulos do Sistema

### 1. Módulo de Cadastro de Pets
- Lista os pets cadastrados, como opções de filtro pelo nome e espécie do pet
- Permite cadastrar, editar e deletar um pet
- Mostra detalhes de um pet

### 2. Módulo de Agendamento de Cuidados
- Lista os agendamentos criados, com opções de filtro
- Cria agendamentos manuais
- Permite cancelar e remarcar agendamentos

### 3. Módulo de Notificação
- Exibe as notificações de emails enviados, com opções de filtro
- Permite marcar notificações como lidas, e reeviar notificações com falha


## Tecnologias Utilizadas

- NodeJs v22.14.0
- Angular v19
- PrimeNg
- Taiwind Css

## Pré-requisitos

- NodeJs 22+
- Docker e Docker Compose
- Git

## Como Executar o Projeto

### 1. Clonando o repositório

```bash
git clone --recursive git@git.gft.com:kalo/desafio-angular.git
cd desafio-angular
```

### 2. Iniciando o backend

```bash
docker-compose -f ./backend-microservices/docker-compose.yml --build up -d
```

### 3. Iniciando o frontend

```bash
npm install
npm run start
```

