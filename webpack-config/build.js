let version = require('../helper/version.json').version;

let path = require('path');
let tool = require('../helper/tool');
tool.write('./src/main/version.js','export default "'+version+'";')

module.exports = {
    entry: path.resolve('./',"src/main/index.js"),
    output: {
        path: path.resolve('./',"dist"),
        filename: "cnchar."+version+".min.js"
    },
    module: {
        rules: [
            {
                test: /(.js)$/,
                use: [{
                        loader: "babel-loader"
                    }],
                exclude: /node_modules/
            }
        ]
    }
};