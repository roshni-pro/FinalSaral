export class Stock {

    name: string;
    quantity: number;

    constructor(stock?){
        this.name = stock && stock.name ? stock.name : '';
        this.quantity = stock && stock.quantity ? stock.quantity : 0;
    }

}