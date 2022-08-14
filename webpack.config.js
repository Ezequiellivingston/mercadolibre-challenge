const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/main.js",

    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
                type: "asset/resource",
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: "body",
            template: "./public/index.html",
            filename: path.resolve(__dirname, "./build/index.html"),
        })
    ],

    resolve: {
        extensions: ["*", ".js", ".jsx"],
        alias: {
            "@": path.resolve(__dirname, "src/"),
        },
    },

    output: {
        path: path.resolve(__dirname, "build"),
        clean: true
    },
}