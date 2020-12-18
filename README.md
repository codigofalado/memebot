# memebot

BOT que integra o chat da Twitch com o OBS para permitir que diferentes comandos possam ativar Sources de Vídeos (Memes) na Live.

Foi desenvolvido ao vivo no canal de Live Coding [Código Falado](https://www.twitch.tv/codigofalado).

## Pré-Requisitos

1. Você precisa instalar o plugin [obs-websocket](https://github.com/Palakis/obs-websocket) para permitir que o nosso bot "converse" com o seu OBS Studio.
2. Você precisa ter o [Node](https://nodejs.org/en/) instalado para poder baixar e usar as dependências necessárias para o web server funcionar no seu computador.
3. Você precisa criar um usuário adicional na Twitch para atuar como o seu BOT.
4. Você precisa criar uma CENA no seu OBS chamada "Memes". Nesta cena você vai adicionar todos os memes em forma de "Media Source". Ao adicionar cada Meme, use sempre uma única palavra no nome do Media Source que você está incluindo. Após posicionar o meme na tela, oculte-o. O trabalho do BOT está em identificar o comando digitado no chat e tornar o seu Media Source visível por 5 segundos. É importante que, ao adicionar um Media Source, você marque os checkboxes **"Restart playback when source becomes active"**, **"Show nothing when playback ends"** e **"Close file when inactive"**.
5. Importe a CENA "Memes" para as outras Cenas da sua Live, deixe-a sempre no topo para que os memes possam aparecer em cima dos elementos da sua Live.

## Instalação em 10 Passos Simples

1. Baixe este projeto para o seu computador.
2. Entre na pasta deste projeto pelo terminal.
3. Digite `npm install` para instalar todas as dependências **(caso este comando não exista no seu terminal, veja item #2 dos "Pré-Requisitos" acima)**.
4. Renomeie o arquivo `.env_example` para `.env`.
5. Edite o `.env` definindo os valores para cada variável. Veja a seção "Explicando o .env" abaixo para mais detalhes.
6. Você precisa fazer o mapeamento entre o código do MEMEBOT e os seus Media Sources no OBS: Crie os seus comandos editando o arquivo `src/user/commands.ts`. Na linha 3 há a criação de um objeto chamado `commands`. Cada item deste objeto (linhas subsequentes) é um comando para um meme diferente, seguindo este formato:

```ts
private commands = {
    Source1: ["!comando1", "!outro_comando"],
    Source2: ["!comando2", "!mais_outro"],
    Memes: ["!memes", "!meme"]
};
```

Onde `Source1` e `Source2` serão os nomes de cada source que você adicionou na sua CENA "Memes" em seu OBS. E `!comando1`/`!outro_comando` são os comandos que o usuário precisa digitar no chat da Twitch para ativar/usar este meme. **Não delete o comando "Memes", que fica na última linha da declaração de `commands`.**
Depois que você adicionou todos os comandos no arquivo `src/user/commands.ts`, o objeto `commands` deverá conter uma linha de código para cada Media Source presente em sua CENA "Memes" no OBS, mais uma linha para o próprio comando "!memes".

7. No final do arquivo `src/user/commands.ts`, edite a função `all()`. Esta função é o que o MEMEBOT manda para o chat da Twitch quando o usuário digita `!memes` ou `!meme` (ou qualquer outro comando que você atribuir ao `Meme` no objeto `commands`).
8. Digite `npm run build` para criar a aplicação.
9. Está tudo pronto para colocar o MEMEBOT para funcionar. Sempre que você for começar uma Live, rode o comando `npm run start` em seu terminal, à partir da pasta principal do MEMEBOT.
10. Teste seus comandos no chat da Twich e faça uma dança de comemoração.

### Explicando o `.env`

- **USER** - O nome do usuário do seu BOT.
- **CHANNEL** - O nome do usuário do seu Canal na Twitch.
- **TOKEN** - O ACCESS TOKEN do seu BOT (gere um [aqui](https://twitchtokengenerator.com/) autenticando como "Bot Chat Token")
- **COOLDOWN** - Número de segundos que o público deve esperar até poder usar outro meme. Este recurso serve para impedir que sua Live seja inundada por Memes.
- **OBS_ADDRESS** - Endereço de acesso ao seu OBS. Para ver qual valor é usado no seu OBS, vá em "Tools" -> "Websockets Server Settings". Se você não encontrar a opção "Websockets Server Settings" dentro de "Tools", veja item #1 dos "Pré-Requisitos".
- **OBS_PORT** - Porta de acesso ao seu OBS. Para ver qual valor é usado no seu OBS, vá em "Tools" -> "Websockets Server Settings". Se você não encontrar a opção "Websockets Server Settings" dentro de "Tools", veja item #1 dos "Pré-Requisitos".
- **OBS_PASSWORD** - Password de acesso ao seu OBS. Para ver qual valor é usado no seu OBS, vá em "Tools" -> "Websockets Server Settings". Se você não encontrar a opção "Websockets Server Settings" dentro de "Tools", veja item #1 dos "Pré-Requisitos". O valor padrão é vazio.

## Melhorando o Projeto

Para inciar o MEMEBOT em formato de desenvolvimento, rode o comando `npm run start:dev` e comece a se divertir melhorando o projeto.

# To-do (Recursos entregues e futuros):

- [x] Instalar o Nest.JS
- [x] Criar um módulo para receber o código do BOT
- [x] Instalar a Twitch JS
- [x] Criar arquivo de configuração com os dados do canal
- [x] Conectar-se ao chat e "ouvir" as mensagens
- [x] Abstrair os dados da mensagem individual e criar uma classe User
- [x] Criar uns comandos de teste
- [x] Certificar-se de que apenas subs podem enviar os comandos
- [x] Certificar-se de que os comandos são case insensitive
- [x] Adicionar um cooldown de 60 segundos por comando
- [x] Instalar a dependência necessária para a comunicação BOT -> OBS
- [x] Tentar listar os Sources
- [x] Tentar exibir/ocultar diferentes sources
- [x] Criar os comandos finais para o BOT
- [x] Conectar cada comando com o respectivo source
- [ ] Criar um comando para meme randômico
- [ ] Adicionar variável de configuração para decidir se quero limitar os memes para Subs ou não.
- [ ] Integrar o MEMEBOT ao recurso de Pontos do Canal na Twitch e deixar configurável.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
