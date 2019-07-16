export default class retailCard {
    points;
    name;
    cardNumber;
    Id;
    category;
  
    constructor(name = "NoName!",points = 0, id = 69, cardNumber = "1234 5678 9876 5432", category = 0) {
        this.name = name;
        this.points = points;
        this.cardNumber = cardNumber;
        this.id = id;
        this.category = category;

        //categories: 0 for food, 1 for clothing, 2 for gas....
    }
    
  }