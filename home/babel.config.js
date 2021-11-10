const config = (api) => {
    api.cache(false)

    return {
        presets: ["@babel/typescript-preset", "@babel/preset-react"]
    }
}

export default config