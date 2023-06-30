const { Enterprise } = require('../../database')

const postEnterprise = async (req, res) => {
  // Enterprise values
  const { ruc, name, address } = req.body

  if(!ruc || !name || !address) throw res.status(400).json({error: 'Missing data'})

  // Create enterprise
  try{
    await Enterprise.create({
      ruc,
      name,
      address
    })
  
    return res.status(200).json({
      created: true,
      name
    })
  }
  catch(error){
    console.log(error)
    return res.status(500).json({
      created: false,
      name,
      error: error
    })
  }
}

module.exports = postEnterprise