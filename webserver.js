var express = require('express')
var app = express()

app.use(express.static(__dirname));
app.get('/', (request, response) => {
    response.sendFile('toast.html', {
        root: './'
      });
})

app.listen(9292)