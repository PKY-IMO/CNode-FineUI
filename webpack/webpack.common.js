const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

const dirs = require("./dirs");

module.exports = {
    entry: {
        bundle: [
            "./src/index.js",
        ],
    },
    resolve: {
        mainFields: ["module", "main"],
        extensions: [".js"],
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                include: [dirs.NODE_MODULES, dirs.SRC],
                use: [{
                    loader: "babel-loader",
                    options: {
                        configFile: dirs.BABEL_CONFIG,
                    },
                }, {
                    loader: "source-map-loader",
                    options: {
                        enforce: "pre",
                    },
                }],
            },
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [autoprefixer],
                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            relativeUrls: false,
                        },
                    },
                ],
            },
        ],
    },
};
