export default class Commands {
    // Cada comando é um MEME diferente no vídeo
    private commands = {
        KO: ["!ko"],
        Boy: ["!hehe", "!boy", "!boi"],
        Shit: ["!shit", "!merda"],
        Nazare: ["!nazare", "!conta", "!matematica"],
        Windows: ["!windows", "!ruindows", "!telaazul"],
        Surprise: ["!surprise", "!modafoca", "!surpresa"],
        Smart: ["!smart", "!think", "!esperto"],
        Magic: ["!magic"],
        Cafe: ["!cafe", "!café", "!coffee"],
        Dancing: ["!dancing", "!dança", "!danca", "!dance"],
        Uau: ["!uau", "!wow"],
        Errou: ["!errou", "!errado"],
        Erro: ["!erro", "!error", "!bug"],
        Confuso: ["!confuso", "!travolta"],
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
        let allCommands = "!memes";
        Object.keys(this.commands).forEach(element => {
            if(element != "Memes"){
                allCommands += ", "+ this.commands[element][0];
            }
        });
        return `Você pode usar esses memes: ${allCommands}`;
    }
}