import path from 'path'
import { cwd } from 'process'
import HTMLWebpackPlugin from 'html-webpack-plugin' 
import webpack from 'webpack'

const { ModuleFederationPlugin } = webpack.container

const getPath = (...args) => path.join(cwd(), ...args)

const config = {
    entry: getPath('src', 'index.js'),
    output: {
        filename: "[name].js",
        path: getPath("dist"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    },
    devServer: {
        port: 3000,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'home',
            filename: 'federated.js',
            library: {
                type: "var",
                name: "home"
            },
            exposes: {
                './Header': './src/components/shared/Header',
                './Footer': './src/components/shared/Footer'
            },
            shared: {
                "react": {
                    requiredVersion: "^17.0.2",
                    // eager: true,
                    // singleton: true
                },
                "react-dom": {
                    requiredVersion: "^17.0.2",
                    // eager: true,
                    // singleton: true,
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
        }),
        new HTMLWebpackPlugin({
            template: './public/index.html'
        }),
    ]
}

export default config