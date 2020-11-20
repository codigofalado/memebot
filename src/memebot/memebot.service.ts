import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import User from '../user/user';
import Commands from '../user/commands';
import TwitchJs, { Api, ApiVersions, Chat, Message, TwitchJsOptions } from 'twitch-js';

@Injectable()
export class MemebotService implements OnModuleInit {
    private api:Api;
    private chat:Chat;
    private channel;
    constructor(private configService: ConfigService){
        const token = this.configService.get<string>('TOKEN');
        const username = this.configService.get<string>('USER');
        this.channel = this.configService.get<string>('CHANNEL');
        const { api, chat } = new TwitchJs({ token, username });
        this.api = api;
        this.chat = chat;
        // Connect ...
        this.chat.connect().then(() => {
        // ... and then join the channel.
        chat.join(this.channel);
        });
        console.log("Memebot Provider Started");
    }

    test(){
        const test = this.configService.get<string>('TESTE');
        console.log(test);
        
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
                    if(user.isSub){
                        let seconds = Math.floor((user.date.valueOf() - lastCommandTimestamp) / 1000);
                        if(seconds < cooldown){
                            this.chat.say(this.channel, `@${user.username}, aguarde ${cooldown - seconds} segundos para usar ${commands.command} novamente!`);
                        }else{
                            this.chat.say(this.channel, `@${user.username}, você usou o ${commands.command}!`);
                            lastCommandTimestamp = user.date.valueOf();
                            seconds = cooldown;
                        }                        
                    }else{
                        this.chat.say(this.channel, `@${user.username}, apenas inscritos podem usar este comando. Use !sub para mais detalhes.`); 
                    }
                    
                }
                // console.log(`Nova Mensagem de ${message.username}: ${message.message}`);
                console.log(`Nova Mensagem de ${message.username}:`, message);
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
        this.test();
    }
}
