// deposit some money
// determine no of line to bet on
//collect the bet amount 
//spin the slot machine
//check if the user is winning
// give the user winning money
// play again

//// function there are two types of function writing in js

// function deposit(){
//     return 1;
// }
// deposit();

const prompt = require("prompt-sync")(); // to collect the user input
const ROWS =3
const COLS = 3
const SYMBOLS_COUNT= {
    A:2,
    B:4,
    C:6,
    D:8
}
const SYMBOLS_VALUES= {
    A:5,
    B:4,
    C:3,
    D:2
}

const deposit =()=>{
    while(true){
           const depAmount = prompt("Enter the deposit amount: ")
   const numberDepAmount = parseFloat(depAmount);

   if(isNaN(numberDepAmount) || numberDepAmount < 0){
    console.log("Invalid deposit amount.  try again")
   }else{
    return numberDepAmount
   }
    }
}

const numberOfLines = ()=>{
    while(true){
        const line = prompt("Enter Number Of line U want to bet(1-3) ")
        const numberOfLine= parseInt(line)

        if(isNaN(numberOfLine) || numberOfLine <=0 || numberOfLine > 3){
            console.log("Invalid number of Lines, try again.")
        }
        else{
            return numberOfLine
        }
    }
}

const Bet =(balance,numberOfLine)=>{
        while(true){
        const bet = prompt("Enter Number Of Bet in aline ")
        const numberBet= parseInt(bet)

        if(isNaN(numberBet) || numberBet <=0 || numberBet > (balance/numberOfLine)){
            console.log("Invalid amount of bet, try again.")
        }
        else{
            return numberBet
        }
    }

}

const spin = ()=>{
    const symbols=[]
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for (let i=0; i<count; i++){
            symbols.push(symbol)
        }
    }
    const reels=[]
    for(let i=0; i<COLS; i++){
        reels.push([])
        const reelSymbols=[...symbols]
        for(let j=0; j<ROWS; j++){
            const randomIndex= Math.floor(Math.random() * reelSymbols.length)
            const selectedSysmbol= reelSymbols[randomIndex]
            reels[i].push(selectedSysmbol)
            reelSymbols.splice(randomIndex,1)
        }
    }
    return reels
}

const transpose =(reels)=>{
    const rows=[]
    for(let i=0; i<ROWS; i++){
        rows.push([])
        for(let j=0; j<COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows
}
const printRows =(rows)=>{
    for(const row of rows){
        let rowString =" "
        for(const [i, symbol] of row.entries()){
            rowString += symbol
            if(i != row.length -1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}
const getWinnings =(rows, numberBet,numberOfLines)=>{
    let winings = 0;
    for(let row =0; row < numberOfLines; row++){
        const symbols =rows[row]
        let allSame =true

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false
                break
            }
        }
        if(allSame){
            winings += numberBet * SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winings
}

const game =()=>{
    let balance=deposit()
    while(true){
        console.log("You have a balance of $" + balance)
        const numberOfLine=numberOfLines()
        const numberBet = Bet(balance,numberOfLine)
        balance -= numberBet * numberOfLines
        const spinner=spin()
        const rows= transpose(spinner)
        printRows(rows);
        const winings = getWinnings(rows, numberBet,numberOfLines)
        balance += winings;
        console.log("You won, $" + winings.toString())
        if(balance <=0){
            console.log("You ran out of money!")
            break
        }
        const playAgain =prompt("Do you want to play again (y/n)? ")
        if(playAgain != "y") break
    }
    

}

game()

