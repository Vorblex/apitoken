const { Starship } = require('src/models')

exports.getStarships = (req, res) => {
  Starship.find({}, (err, data) => {
    const result = data.map(el => {
      return `<h3>${el.title}</h3>`
    })
 
    res.send('<h1>Starships page</h1>' + result.join(''))
  })
}

exports.newStarship = (req, res) => {
  const star = new Starship({title: req.params.title})
  star.save((err, data) => {
    console.log(data);
    res.send(data)
  })
}