const { Trip } = require('../../database')

const putTrip = async (req, res) => {
  //Trip value
  const { id, type, total, start, end, state, driverRating, userRating } = req.body

  //Update trip
  try{
    const trip = await Trip.findOne({ where: { id } })

    type ? trip.type = type : null
    total ? trip.total = total : null
    start ? trip.start = start : null
    end ? trip.end = end : null
    state ? trip.state = state : null
    driverRating ? trip.driverRating = driverRating : null
    userRating ? trip.userRating = userRating : null
    
    await trip.save()

    return res.status(200).json({
      updated: true,
      id
    })
  }
  catch(error){
    console.log(error)
    return res.status(500).json({
      updated: false,
      id,
      error: error
    })
  }
}

module.exports = putTrip