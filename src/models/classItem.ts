import cartItem from "./cartItem";

// This entire ClassItem may be redundant, as cartItem establishes structure, but does not use a constructor
// which is alright in this scenario

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