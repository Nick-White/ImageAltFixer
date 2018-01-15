const path = require("path");

var commonConfig = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ ".ts", ".js" ]
  }
};

var fixerConfig = Object.assign({}, commonConfig, {
  entry: "./src/fixer.ts",
  output: {
    filename: "fixer.js",
    path: path.resolve(__dirname, "dist")
  }
});

module.exports = [fixerConfig];