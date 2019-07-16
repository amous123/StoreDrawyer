export class LoyaltyCard{
    card_name;
    card_balance;
    card_id;
    card_rate;
    // transaction_history;

    constructor(name, balance, id, rate){
        this.card_name = name;
        this.card_balance = balance;
        this.card_id = id;
        this.card_rate = rate;
    }
}