const
    assetDir = './assets',
    buildDir = 'assets/build',
    path = require('path'),
    webpack = require('webpack'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {

    const
        devMode = env.NODE_ENV !== 'production',
        cssPlugins = [
            require('autoprefixer')
        ]
    
    if (!devMode) {
        cssPlugins.push(require('cssnano')({
            preset: 'default'
        }))
    }
    
    return {
        mode: devMode ? 'development' : 'production',
        entry: [assetDir + '/js/app.js', assetDir + '/scss/app.scss'],
        output: {
            filename: 'js/app.min.js',
            path: path.resolve(__dirname, buildDir),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: {
                                        'ie': '11'
                                    }
                                }]
                            ]
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'string-replace-loader',
                            options: {
                                search: '../font/fontello',
                                replace: 'fontello/font/fontello',
                                flags: 'g'
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {}
                        }
                    ]
                }
            ]
        },
        devtool: devMode ? 'source-map' : false,
        plugins: [
            new MiniCssExtractPlugin()
        ]
    }
    
}