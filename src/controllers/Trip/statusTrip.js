const { Trip } = require('../../database')

const statusTrip = async (req, res) => {
  //Status value
  const { id, status } = req.body

  if(!status) throw res.status(400).json({error: 'Missing data'})

  try{
    const trip = await Trip.findOne({ where: { id } })

    trip.status = status

    await trip.save()

    return res.status(200).json({
      updated: true,
      id,
      status
    })
  }
  catch(error){
    console.group(error)
    return res.status(500).json({
      updated: false,
      error: error
    })
  }
}

module.exports = statusTrip