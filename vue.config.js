module.exports = {
  pages: {
    options: {
      // entry for the page
      entry: 'src/options.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'options.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Options Page'
    },
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    app: {
      // entry for the page
      entry: 'src/extension.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'app.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'App Page'
    },
  },
  filenameHashing: false,
  chainWebpack: config => { // https://forum.vuejs.org/t/disable-code-splitting-in-vue-cli-3/36295/8
    config.optimization.splitChunks(false);
  }
}
