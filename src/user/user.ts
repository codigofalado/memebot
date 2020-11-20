import { Message } from 'twitch-js';
export default class User {
    constructor(private _message: Message){}

    get isSub():boolean{
        return !!parseInt(this._message.tags.subscriber);
    }
    get isMod():boolean{
        return !!parseInt(this._message.tags.mod);
    }
    get username():string{
        return this._message.username;
    }
    get message():string{
        return this._message.message;
    }
    get date():Date{
        return new Date(this._message.timestamp);
    }
}
