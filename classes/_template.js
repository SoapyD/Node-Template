
const Template = class {
    constructor(options) {

        this.name = options.name;
        
    }

    printName = () => {
        console.log(this.name)
    }

}


module.exports = Template