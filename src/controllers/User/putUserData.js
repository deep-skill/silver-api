const { User } = require('../../database')

const putUserData = async (req, res) => {
  // User values
  const { id, phone, address, license, rating } = req.body

  if(!id || !phone || !address || !license || !rating) throw res.status(400).json({error: 'Missing data'})

  // Update User data table
  try{
    const user = await User.findOne({ where: {id} })

    user.phone = phone
    user.address = address
    user.license = license
    user.rating = rating

    await user.save()

    return res.status(200).json({
      updated: true,
      name: user.name
    })
  }
  catch(error){
    console.log(error)
    return res.status(500).json({
      updated: false,
      name: null
    })
  }
}


module.exports = putUserData