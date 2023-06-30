const { User } = require('../../database')

const postAuth = async (req, res) => {
  // Auth0 values
  const { id, name, email } = req.body
  if(!id || !name || !email) throw res.status(400).json({error: 'Missing data'})

  // Find or create user in database
  try{
    const [_, created] = await User.findOrCreate({
      where: {
        id
      },
      defaults: {
        name,
        email
      }
    })

    return res.status(200).json({
      created,
      name
    })
  }
  catch(error){
    console.log(error)
    return res.status(500).json({
      error: error.message
    })
  }
}

module.exports = postAuth