var path = require('path')
var webpack = require('webpack')
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

function entries (globPath) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        //extname取文件名后缀
        basename = path.basename(entry, path.extname(entry));
        entries[basename] = './' + entry;
    }
    return entries;
}

module.exports = {
    entry: entries('./react_web/src/js/apps/*.js'),
    output: {
        path: __dirname + '/apps/',//[hash]
        //publicPath: "http://pic.500px.me/[hash]/",
        filename: '[name].js'//.[hash]
        //chunkFilename: "[id].bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    // module: {
    //     loaders: [{
    //         test: /\.js$/,
    //         loader: 'jsx-loader?harmony'
    //     }, {
    //         test: /\.jsx$/,
    //         loader: 'jsx-loader?harmony'
    //     }, {
    //         test: /\.css$/,
    //         loader: 'css-loader?harmony'
    //     }]
    // },
    resolve:{
        extensions:['', '.js','.jsx']
    },

    module: {
        // preLoaders: [
        //     // 报错 ？？？？？
        //     {test: /\.(js|jsx)$/, loader: "eslint-loader", exclude: /node_modules/}
        // ],
        loaders: [
            {test: /\.(js|jsx)$/,  loader: 'babel'},
            {test: /\.less$/, loader: 'style!css!postcss!less'},
            {test: /\.css$/, loader: 'style!css!postcss'},
            {test: /\.(png|gif|jpg|jpeg|bmp)$/i, loader: 'url-loader?limit=5000'},  // 限制大小5kb
            {test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, loader: 'url-loader?limit=5000'} // 限制大小小于5k
        ]
    },

    eslint: {
        configFile: '.eslintrc' // Rules for eslint
    },

    postcss: [
        require('autoprefixer') //调用autoprefixer插件，例如 display: flex
    ],

    plugins: [
        // webpack 内置的 banner-plugin
        new webpack.BannerPlugin("Copyright by 634152568@qq.com"),
        // html 模板插件
        new HtmlWebpackPlugin({
            template: __dirname + '/react_web/src/index.tmpl.html'
        }),
        // 定义为生产环境，编译 React 时压缩到最小
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),

        // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        // new webpack.optimize.OccurenceOrderPlugin(),
        //
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         //supresses warnings, usually from module minification
        //         warnings: false
        //     }
        // }),

        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.js"
        }),

        // 分离CSS和JS文件
        new ExtractTextPlugin('[name].[hash:8].css'),

        // 打开浏览器
        new OpenBrowserPlugin({
          url: 'http://localhost:8080'
        }),

        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ],



    devServer: {
        proxy: {
          // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
          // koa 代码在 ./mock 目录中，启动命令为 npm run mock
          '/api': {
            target: 'http://localhost:3000',
            secure: false
          }
        },
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true  // 使用热加载插件 HotModuleReplacementPlugin
    }
}
