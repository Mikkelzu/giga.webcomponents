'use strict'

var compressor = require('node-minify')

compressor.minify(
    {
        compressor: 'uglifyjs',
        input: './src/giga.js',
        output: './src/giga.js',
        callback: function(err, min) {}
    }
)