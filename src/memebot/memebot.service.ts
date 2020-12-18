import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import User from '../user/user';
import Commands from '../user/commands';
import TwitchJs, { Api, ApiVersions, Chat, Message, TwitchJsOptions } from 'twitch-js';
const OBSWebSocket = require('obs-websocket-js');

@Injectable()
export class MemebotService implements OnModuleInit {
    private api:Api;
    private chat:Chat;
    private channel;
    private obs;
    constructor(private configService: ConfigService){
        const token = this.configService.get<string>('TOKEN');
        const username = this.configService.get<string>('USER');
        this.channel = this.configService.get<string>('CHANNEL');
        const obs_address = this.configService.get<string>('OBS_ADDRESS');
        const obs_port = this.configService.get<string>('OBS_PORT');
        const obs_password = this.configService.get<string>('OBS_PASSWORD');
        const { api, chat } = new TwitchJs({ token, username });
        this.api = api;
        this.chat = chat;
        let _obs = new OBSWebSocket();
        _obs.connect({
            address: `${obs_address}:${obs_port}`,
            password: obs_password
        }).then(() => {
            this.obs = _obs;
            // Listen to Visibility Change
            this.obs.on('SceneItemVisibilityChanged', async (data) => {
                if(data.sceneName == "Memes" && data.itemVisible === true){
                    setTimeout(() => { return this.setMemeVisibility(data.itemName, false)}, 5000);
                }
            });
            // Connect ...
            this.chat.connect().then(() => {
            // ... and then join the channel.
            chat.join(this.channel);
            });
        });
        console.log("Memebot Provider Started");
    }
    async setMemeVisibility(meme:string, visibility:boolean){
        return this.obs.send("SetSceneItemProperties", {
            'scene-name': "Memes",
            item: meme,
            visible: visibility
        })
    }
    onModuleInit() {
        console.log(`The module has been initialized.`);
        let lastCommandTimestamp = new Date("1983-02-27").valueOf();
        // Listen for all messages.
        this.chat.on(TwitchJs.Chat.Events.ALL, message => {
            if(message.command === TwitchJs.Chat.Commands.PRIVATE_MESSAGE){
                const user = new User(message);
                const commands = new Commands(user.message);
                const cooldown = this.configService.get<number>('COOLDOWN');
                if(commands.isCommand){
                    // Se o comando é Memes, retorna o texto no chat
                    if(commands.command == 'Memes'){
                        return this.chat.say(this.channel, `@${user.username}, ${commands.all}`);
                    }
                    // if(user.isSub){
                        let seconds = Math.floor((user.date.valueOf() - lastCommandTimestamp) / 1000);
                        if(seconds < cooldown){
                            this.chat.say(this.channel, `@${user.username}, aguarde ${cooldown - seconds} segundos para usar ${commands.command} novamente!`);
                        }else{
                            lastCommandTimestamp = user.date.valueOf();
                            seconds = cooldown;
                            this.setMemeVisibility(commands.command, true);
                        }                        
                    // }else{
                    //     this.chat.say(this.channel, `@${user.username}, apenas inscritos podem usar este comando. Use !sub para mais detalhes.`); 
                    // }
                    
                }
                // console.log(`Nova Mensagem de ${message.username}: ${message.message}`);
                // console.log(`Nova Mensagem de ${message.username}:`, message);
            }else{
                // console.log(`Nova Mensagem estranha`, message);
            }
            
            // Use discriminated unions on `message.command` and `message.event` to
            // determine the type of `message`.
            if (
            message.command === TwitchJs.Chat.Commands.USER_NOTICE &&
            message.event === TwitchJs.Chat.Events.SUBSCRIPTION
            ) {
                console.log(message.parameters.subPlan);
                // Do stuff with subscription message ...
            }
        });
    }
}
