import path from 'path'
import {cwd} from 'process'
import HTMLWebpackPlugin  from 'html-webpack-plugin'
import webpack from 'webpack'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const packageJSON = require('./package.json')

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
            name: 'products',
            filename: 'components.js',
            remotes: {
                footer: 'footer@http://localhost:3000/footer.js',
                header: 'header@http://localhost:3000/header.js',
            },            
            exposes: {
                './components/ProductCard': './src/components/ProductCard.jsx',
            },
            shared:{
                "react": {
                    requiredVersion: packageJSON.dependencies.react,
                    singleton: true
                },
                "react-dom": {
                    requiredVersion: packageJSON.dependencies['react-dom'],
                    singleton: true
                },
                "@chakra-ui/react": {
                    requiredVersion: packageJSON.dependencies['@chakra-ui/react'],
                    singleton: true,
                },
                "@emotion/react": {
                    requiredVersion: packageJSON.dependencies['@emotion/react'],
                    singleton: true
                },
                "emotion/styled": {
                    requiredVersion: packageJSON.dependencies['@emotion/styled'],
                    singleton: true
                },
                "framer-motion": {
                    requiredVersion: packageJSON.dependencies['framer-motion'],
                    singleton: true
                }
            }
        })
    ]
}

export default config