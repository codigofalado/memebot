import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
        // Listen for all messages.
        this.chat.on(TwitchJs.Chat.Events.ALL, message => {
            if(message.command === TwitchJs.Chat.Commands.PRIVATE_MESSAGE){
                // console.log(`Nova Mensagem de ${message.username}: ${message.message}`);
                console.log(`Nova Mensagem de ${message.username}:`, message);
                if(message.username == 'codigofalado'){
                    this.chat.say(this.channel, `@${message.username}, sua linda!`);                    
                }
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
