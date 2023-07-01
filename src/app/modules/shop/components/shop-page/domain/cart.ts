import { CartItem, Product } from "../../../interfaces/interfaces";

export class Cart {
    public readonly items: CartItem[]
    constructor(cart?: {items: CartItem[]}) {
        this.items = cart ? cart.items : [];
    }

    public addProduct(product: Product) {
        const filteredItems = this.items.filter(_ => _.product.id === product.id);
        if (filteredItems.length === 0){
            this.items.push({product, quantity: 1});
            return;
        }

        for (let item of this.items) {
            if (item.product.id === product.id) {
                item.quantity++;
                return;
            }
        }
    }

    public canDecrease(product: Product) {
        const prodIndex = this.items.findIndex(_ => _.product.id === product.id);
        return this.items[prodIndex].quantity > 1;
    }

    public removeProduct(product: Product, full?: boolean) {
        for (let i = 0; i < this.items.length; i++) {
            if(this.items[i].product.id === product.id) {
                if(full){
                    this.items.splice(i, 1);
                    return;
                }
                if(this.items[i].quantity > 1)
                    this.items[i].quantity--;
                return;
            }
        }
    }

    public getSum() {
        return this.items.map(_ => _.product.price * _.quantity).reduce((a, b) => a + b);
    }

}
