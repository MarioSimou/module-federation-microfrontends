import path from 'path'
import { cwd } from 'process'
import HTMLWebpackPlugin from 'html-webpack-plugin' 
import webpack from 'webpack'
import { createRequire } from 'module'
import TSConfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
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
                test: /\.tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react", "@babel/preset-typescript"]
                }
            },
        ]
    },
    devServer: {
        port: 3000,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        plugins: [
            new TSConfigPathsPlugin({
                configFile: 'tsconfig.json',
                extensions: ['.ts','.tsx']
            })
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'footer',
            filename: 'footer.js',
            exposes: {
                './Footer': './src/components/shared/Footer.tsx'
            },
            shared: {
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
            },
        }),
        new ModuleFederationPlugin({
            name: 'header',
            filename: 'header.js',
            exposes: {
                './Header': './src/components/shared/Header.tsx'
            },
            shared: {
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
            },
        }),
        new ModuleFederationPlugin({
            remotes: {
                product: 'product@http://localhost:3002/_next/static/chunks/remoteEntry.js',
                products: 'products@http://localhost:3001/components.js',
                footer: 'footer@http://localhost:3000/footer.js',
                header: 'header@http://localhost:3000/header.js',
            },
            shared: {
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
            },
        }),
        new HTMLWebpackPlugin({
            template: './public/index.html'
        }),
    ]
}

export default config