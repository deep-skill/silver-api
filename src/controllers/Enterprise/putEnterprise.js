const { Enterprise } = require('../../database')

const putEnterprise = async (req, res) => {
  //Enterprise value
  const { ruc, newRuc, name, address } = req.body

  //Update enterprise
  try{
    const enterprise = await Enterprise.findOne({ where: { ruc } })

    newRuc ? enterprise.ruc = newRuc : null
    name ? enterprise.name = name : null
    address ? enterprise.address = address : null
    
    await enterprise.save()

    return res.status(200).json({
      updated: true,
      ruc
    })
  }
  catch(error){
    console.log(error)
    return res.status(500).json({
      updated: false,
      ruc,
      error: error
    })
  }
}

module.exports = putEnterprise