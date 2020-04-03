const express = require('express');
var path = require('path');
const app = express();
const Joi = require('joi');
var fs = require('fs');
const data = fs.readFileSync('public/albums.json');
var parsedata = JSON.parse(data);
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(express.json());
app.use(express.static(__dirname + '/public'));





app.get('/', (req, res) => {
  res.sendFile('albums.html', {root: path.join(__dirname, '.')});
});



app.get('/albums', (req, res)=>{
  res.sendFile('albums.html', {root: path.join(__dirname, '.')});

});




app.post('/albums',urlencodedParser, (req,res)=>{
    const { error } = validatePodcast(req.body); // result.error
    if (error) return res.status(400).send(error.details[0].message);

    const albums = {
        id: parsedata.albums.length +1,
        name: req.body.name,
        album: req.body.album,
        image: req.body.image

    };

    parsedata.albums.push(albums);
    parsedata  = JSON.stringify(parsedata, null ,2)


    fs.writeFile("public/albums.json", parsedata, (err, data)=>{
        if (err) throw err;
        console.log(`Saved to file ${parsedata}`);

    });


    res.sendFile(path.join(__dirname + '/albums.html'));

});


function validatePodcast(albums){
    const schema={
        name: Joi.string().min(3).required(),
        album: Joi.string().required(),
        image: Joi.string().required()
    }
    return Joi.validate(albums, schema);
}



app.get('/albums/:id', (req, res)=>{
    const albums = parsedata.albums.find(c => c.id ===parseInt(req.params.id));

    if (!albums)
    return res.status(404).send('The podcast with the given ID was not found ..')
    res.send(albums)
})


app.listen(3000);
