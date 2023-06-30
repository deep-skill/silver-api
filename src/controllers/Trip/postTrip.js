const { Trip } = require('../../database')

const postTrip = async (req, res) => {
  // Trip values
  const { type, total, start, end, state, driverRating, userRating } = req.body

  if(!type || !total || !start || !end || !state || !driverRating || !userRating) throw res.status(400).json({error: 'Missing data'})

  // Create trip
  try{
    const trip = await Trip.create({
      type,
      total,
      start,
      end,
      state,
      driverRating,
      userRating
    })

    return res.status(200).json({
      created: true,
      tripId: trip.id
    })
  }
  catch(error){
    console.log(error)
    return res.status(500).json({
      created: false,
      error: error
    })
  }
}

module.exports = postTrip