let instance;

export default class dataBus{
    constructor() {
        if (instance) return instance;
        instance = this;
        this.item;
        this.name;
    }
}