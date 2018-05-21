const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        app: "./src/index.js"
    },
    devServer: {
        contentBase: "./dist",
        hot: true,
        historyApiFallback: true
    },
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        sourceMapFilename: "bundle.map",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modulesweb)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["env", "stage-0", "react"]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    // 'resolve-url-loader',
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif|mp3|m4a)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[hash].[ext]",
                            publicPath: "/assets/",
                            outputPath: "assets/"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()]
};
