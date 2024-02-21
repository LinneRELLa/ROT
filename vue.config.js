const { defineConfig } = require('@vue/cli-service')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: '/',
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                extraResources: [
                    { from: './src/config', to: '../config' },
                    { from: './src/aria2', to: '../aria2' }
                ],
                win: {
                    icon: `public/x1.ico`,
                    publish: [{
                        provider: "generic",
                        url: "http://www.rellal.com:8181/" // 更新文件服务器地址
                    }],
                },
                "nsis": {
                    // 关闭了一键集成，因此会走 下一步、下一步、下一步... 进行安装
                    "oneClick": false,
                    "perMachine": false,
                    "allowToChangeInstallationDirectory": true,
                    "deleteAppDataOnUninstall": false
                },
            }
        }
    },
    configureWebpack: {
        plugins: [new CopyWebpackPlugin({ patterns: [{ from: './src/config' }] })],
        resolve: {
            alias: {
                // 设置@/的意义
                '@@': resolve('public')
            }
        }
    },
    devServer: {
        proxy: {
            '/acg': {
                target: "https://www.acg.rip/",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/acg': '',
                }
            }
        },
    }
})