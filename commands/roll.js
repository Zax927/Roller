module.exports = {
	name: 'roll',
	description: 'Rolls a die/dice',
	execute(message, args) {
        let rand = Math.random();
        if (!args.length) {
            return message.channel.send(`You didn't provide a max limit, ${message.author}`);
        } 
        else if (args.length === 1) { 
            let dieType = args[0];
            let dieR = Math.round(rand*dieType);
            return message.channel.send(dieR);
        }
        else if (args.length === 2) {   
            let diceNum = args[0];
            let dieType = args[1];
            let diceR = 0;
            //let dieR = Math.round(rand*(diceNum*dieType));
            for (let rolls = 1; rolls <= diceNum; rolls++){
                let diceRand = getRand();
                //let diceRand = 1;
                let diceM = Math.round(diceRand*(dieType - 1)) + 1;
                let dieT = Math.round(dieType);
                if (diceM === dieT){
                    //console.log('Nat ' + dieType);
                    message.channel.send('Nat ' + dieType);
                }
                if (diceM === 1){
                    message.channel.send('Nat 1');
                }
                diceR += diceM;
            }

            return message.channel.send(diceR);
        } 
        else {
            return message.channel.send('Too many arguments');
        }
        function getRand(){
            //return 0;
            return Math.random();
        }
	},
};