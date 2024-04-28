const path = require('path');
const { resolvePath } = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: '/',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    compress: true,
    port: 3030,
    hot: true,
    open: true,
    historyApiFallback: true,
    proxy: [{
      context: ['/graphql'],
      target: 'http://localhost:3000',
      pathRewrite: { '^/graphql': '' },
      changeOrigin: true,
      secure: false,
    
    }]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-syntax-dynamic-import'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': resolvePath('src'),
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};