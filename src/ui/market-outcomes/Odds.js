export default class Odds {

    constructor ( marketOutcomes, isFractional ) {
        this.state = {
            marketOutcomes: marketOutcomes,
            fractional: isFractional
        };
    };

    static getFractionalOddsString(outcomeArray, index){
        if (outcomeArray[index]){
            return outcomeArray[index].price.num + '/' + outcomeArray[index].price.den;
        }
        return '-';
    }

    static getDecimalOddsString(outcomeArray, index){
        if (outcomeArray[index]){
            const decimalOdds = outcomeArray[index].price.decimal;
            return parseFloat(Math.round(decimalOdds * 100) / 100).toFixed(2);
        }
        return '-';
    }

    getOddsString(index){
        const outcomeArray = this.state.marketOutcomes;
        if (outcomeArray) {
            if (this.state.fractional) {
                return Odds.getFractionalOddsString(outcomeArray, index);
            } else {
                return Odds.getDecimalOddsString(outcomeArray, index);
            }
        }
        return '-';
    }

}