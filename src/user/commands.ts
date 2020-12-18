export default class Commands {
    // Cada comando é um MEME diferente no vídeo
    private commands = {
        KO: ["!ko"],
        Shit: ["!shit", "!merda"],
        Nazare: ["!nazare", "!conta", "!matematica"],
        Windows: ["!windows", "!ruindows", "!telaazul"],
        Surprise: ["!surprise", "!modafoca", "!surpresa"],
        Smart: ["!think", "!smart", "!esperto"],
        Magic: ["!magic"],
        Cafe: ["!cafe", "!café", "!coffee"],
        Dancing: ["!dancing", "!dança", "!danca"],
        Uau: ["!uau", "!wow"],
        Erro: ["!erro", "!error", "!bug"],
        Memes: ["!memes", "!meme"]
    };
    private _isCommand = false;
    private _command:string;
    constructor(private message: string){
        Object.keys(this.commands).forEach(e => {
            if(!this._isCommand){
                this.commands[e].forEach(element => {
                    if(message.toLowerCase().startsWith(element)){
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
    get all(){
        return 'Você pode usar esses memes: !ko, !windows, !surprise, !smart, !nazare, !magic, !dancing, !shit, !cafe, !uau, !erro';
    }
}