export default class Commands {
    // Cada comando é um MEME diferente no vídeo
    private commands = {
        KO: ["!ko"],
        Windows: ["!windows", "!ruindows", "!telaazul"],
        Surprise: ["!surprise", "!modafoca", "!surpresa"],
        Think: ["!think", "!thinking", "!esperto"],
        Memes: ["!memes", "!meme"]
    };
    private _isCommand = false;
    private _command:string;
    constructor(private message: string){
        Object.keys(this.commands).forEach(e => {
            if(!this._isCommand){
                this.commands[e].forEach(element => {
                    if(message.startsWith(element)){
                        this._isCommand = true;
                        this._command = e;
                        return;
                    }
                });
            }
        });
    }
    get command(){
        return this._command;
    }
    get isCommand(){
        return this._isCommand;
    }
}