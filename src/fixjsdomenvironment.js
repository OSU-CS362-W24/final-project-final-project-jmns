const JSDOMEnvironment = require('jest-environment-jsdom').default;

class FixJSDomEnvironment extends JSDOMEnvironment {
    constructor(config, context) {
        super(config, context);

        this.global.URL = URL;
        this.global.Blob = Blob;
    }
}

module.exports = FixJSDomEnvironment;
