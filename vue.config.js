const { defineConfig } = require('@vue/cli-service')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'/',
 pluginOptions:{
           electronBuilder: {
        builderOptions: {
           extraResources: [
                {from: './src/config', to: '../config'}
            ]
        }
    }},
  configureWebpack: {
 plugins: [new CopyWebpackPlugin({patterns:[{ from: './src/config' }]})],
},
  devServer: {
    proxy:{
  	'/acg':{
  		target:"https://www.acg.rip/",
  		changeOrigin:true,
  		secure:false,
  	pathRewrite:{
  		'^/acg':'',
  	}
  	}
  },
}
})
