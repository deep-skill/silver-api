const { User } = require('../../database')

const getUserData = async (req, res) => {
  //User email
  const { email } = req.body

  if(!email) throw res.status(400).json({error: 'Missing data'})

  //Get User data
  try{
    const user = User.findOne({ where: { email } })

    return res.status(200).json({ user })
  }
  catch(error){
    console.log(error)
    return res.status(500).json({
      error: error
    })
  }
}

module.exports = getUserData