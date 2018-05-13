const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

app.set('port', process.env.PORT || 3001);

app.get('/', (req, res) => res.send('API'))

app.get('/api/documents', (req, res) => {
  return fs.readFile(path.resolve(__dirname, './mock/comments.json'), 'utf8', function (err, data) {
    if (err) throw err;
    return res.json(JSON.parse(data));
  });
})

app.listen(app.get('port'), () => console.log(`Server starts on port ${app.get('port')}!`))