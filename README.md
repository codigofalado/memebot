# memebot

BOT que controla os Memes do Canal Código Falado

O objetivo deste BOT é permitir que SUBs do Canal Código Falado possam digitar alguns comandos no chat que habilitem diferentes MEMEs no vídeo da transmissão.

## Comandos Disponíveis:

1. `!teste`: Retorna um "Você é Sub" ou "Você não é Sub" de acordo com o status de quem enviou o comando.

# To-do:

- [x] Instalar o Nest.JS
- [x] Criar um módulo para receber o código do BOT
- [x] Instalar a Twitch JS ou concorrente
- [x] Criar arquivo de configuração com os dados do canal
- [x] Conectar-se ao chat e "ouvir" as mensagens
- [ ] Criar uns comandos de teste
- [ ] Certificar-se de que apenas subs podem enviar os comandos
- [ ] Adicionar um cooldown de 60 segundos por comando
- [ ] Instalar a dependência necessária para a comunicação BOT -> OBS
- [ ] Tentar listar as cenas
- [ ] Tentar exibir/ocultar diferentes sources
- [ ] Criar os comandos finais para o BOT
- [ ] Conectar cada comando com o respectivo source

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
