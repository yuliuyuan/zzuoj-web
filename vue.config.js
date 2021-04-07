// 相关文档 https://cli.vuejs.org/zh/config/#vue-config-js
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const resolve = dir => require('path').join(__dirname, dir);
// const ojPages = "pages/oj"
// const managePages = "pages/manage"

module.exports = {
    // pages: {
    //     index: {
    //         // index: 'index.html',// 默认启动oj 打开index页面
    //         // page 的入口
    //         entry: 'src/main.js',
    //         // 模板来源
    //         template: 'public/index.html',
    //         // 在 dist/index.html 的输出
    //         filename: 'oj.html',
    //         // 当使用 title 选项时，
    //         // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //         title: 'zzuoj',
    //         // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
    //         chunks: ['chunk-vendors', 'chunk-common', 'index']
    //     },
    //     // manage: {
    //     //     // page 的入口
    //     //     entry: 'src/manage.js',
    //     //     // 模板来源
    //     //     template: 'public/manage.html',
    //     //     // 在 dist/index.html 的输出
    //     //     filename: 'manage.html',
    //     //     // 当使用 title 选项时，
    //     //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //     //     title: 'manage',
    //     //     // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
    //     //     chunks: ['chunk-vendors', 'chunk-common']
    //     // }
    // },

    //webpack配置
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@oj', resolve('src/pages/oj'))
            .set('@manage', resolve('src/pages/manage'))
    },

    // configureWebpack: {
    //     module: {
    //         rules: [
    //             {
    //                 test: /\.less$/,
    //                 use: [
    //                     {
    //                         loader: 'less-loader',
    //                         options: { lessOptions: { javascriptEnabled: true } }
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     plugins: [
    //         new CopyWebpackPlugin({
    //             patterns: [
    //                 {
    //                     from: 'node_modules/mavon-editor/dist/highlightjs',
    //                     to: resolve('dist/highlightjs'), // 插件将会把文件导出于/dist/highlightjs之下
    //                 },
    //                 {
    //                     from: 'node_modules/mavon-editor/dist/markdown',
    //                     to: resolve('dist/markdown'), // 插件将会把文件导出于/dist/markdown之下
    //                 },
    //                 {
    //                     from: 'node_modules/mavon-editor/dist/katex', // 插件将会把文件导出
    //                     to: resolve('dist/katex')
    //                 }]
    //         })
    //     ]
    // },
    // devServer: {
    //     disableHostCheck: true
    // }
}
