import cartItem from "./cartItem";

class ClassItem implements cartItem { // class of ClassItem uses cartItem interface layout
    // implements (used for interfaces) vs extends (extends inheriting classes)
    // Interfaces do not have the ability to add functionality, like classes, and abstracts
    constructor(
        public id: number, 
        public product: string, 
        public price: number, 
        public quantity: number
    ) {}

}

export default ClassItem;