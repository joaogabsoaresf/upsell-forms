// const productFunctionMap = {
//     app:getAppValue,
//     site:getAppValue,
// }

// export function getProductValue(membersRange, productType, productName, selectedOption) {
//     const value = productFunctionMap[productName](membersRange, productType, hasSite, hasApp)
//     return value
// }

export class ProductValue {
    constructor({ range, type, site, app }) {
        this.range = range;
        this.type = type;
        this.site = site;
        this.app = app;
        
        this.appValue = 0;
        this.siteValue = 0;

        this.unique = {
            lite: { "1-100": 250, "101-300": 350, "301-600": 450, "601-1000": 550, "1001-2500": 650, "2501-5000": 800, "5001-10000": 1200 },
            pro: { "1-100": 400, "101-300": 400, "301-600": 500, "601-1000": 600, "1001-2500": 750, "2501-5000": 1000, "5001-10000": 1500 }
        };

        this.combo = {
            lite: { "1-100": 400, "101-300": 560, "301-600": 720, "601-1000": 880, "1001-2500": 1040, "2501-5000": 1280, "5001-10000": 1920 },
            pro: { "1-100": 640, "101-300": 640, "301-600": 800, "601-1000": 960, "1001-2500": 1200, "2501-5000": 1600, "5001-10000": 2400 }
        };
    }

    get value() {
        return this.calculateValue();
    }

    calculateValue() {
        if (this.app && this.site) {
            const value = this.combo[this.type][this.range];
            this.appValue = value * 0.6
            this.siteValue = value * 0.4
            return value;
        }
        
        if (this.app){
          this.appValue = this.unique[this.type][this.range];
          return this.appValue
        }

        else if (this.site) {
          this.siteValue = this.unique[this.type][this.range];
          return this.siteValue
        }

        else {
          return 0
        }
    }
}

// const valor = new ProductValue({ range: '301-600', type: 'pro', site: false, app: true });

// console.log(valor.value);
// console.log(valor.appValue)
// console.log(valor.siteValue)