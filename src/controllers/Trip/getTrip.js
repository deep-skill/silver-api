const { Trip } = require('../../database')

const getTrip = async (req, res) => {
  //Trip id
  const { id } = req.body

  if(!id) throw res.status(400).json({error: 'Missing data'})

  //Get Trip data
  try{
    const trip = Trip.findOne({ where: { id } })

    return res.status(200).json({ trip })
  }
  catch(error){
    console.log(error)
    return res.status(500).json({
      error: error
    })
  }
}

module.exports = getTrip