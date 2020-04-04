const Music = require('./../modele/music');


exports.getAllMusic = (req, res) => {
   
    Music
        .findAll()
        .then((music) => {
            console.log(music)
            res.status(200).json({ error: false, data: music })
        })
        .catch(err => res.status(404).json({error: true, message: 'music not found!'}))

}

exports.storeMusic = (req, res) => {

    let { title, urlMusic, } = req.body;

    Music.create({
        title: title,
        urlMusic: urlMusic,

    })
    .then((music) => res.status(201).json({error: false, data: music}))
    .catch((err) => res.status(400).json({error: true, message: 'Bad request !'}))
   
}
