const path = require('path')
const {cwd} = require('process')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const { ModuleFederationPlugin } = webpack.container

const getPath = (...args) => path.join(cwd(), ...args)

module.exports = {
    entry: getPath('src', 'index.js'),
    output: {
        filename: "[name].js",
        path: getPath("dist"),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader'
            }
        ]
    },
    devServer: {
        port: 3001,
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            remotes: {
                home: 'home@http://localhost:3000/federated.js'
            },
            shared: {
                "react": {
                    requiredVersion: "^17.0.2",
                },
                "react-dom": {
                    requiredVersion: "^17.0.2",
                },
                "@chakra-ui/react": {
                    requiredVersion: "^1.6.12"
                },
                "@emotion/react": {
                    requiredVersion: "^11.5.0"
                },
                "emotion/styled": {
                    requiredVersion: "^11.3.0"
                },
                "framer-motion": {
                    requiredVersion: "^4.1.17"
                }
            }
        })
    ]
}