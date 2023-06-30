const { User } = require('../../database')

const statusUserData = async (req, res) => {
  //Status value
  const { email, status } = req.body

  if(!status) throw res.status(400).json({error: 'Missing data'})

  try{
    const user = await User.findOne({ where: { email } })

    user.status = status

    await user.save()

    return res.status(200).json({
      updated: true,
      email,
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

module.exports = statusUserData