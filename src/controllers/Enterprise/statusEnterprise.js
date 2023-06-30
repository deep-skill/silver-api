const { Enterprise } = require('../../database')

const statusEnterprise = async (req, res) => {
  //Status value
  const { ruc, status } = req.body

  if(!status) throw res.status(400).json({error: 'Missing data'})

  try{
    const enterprise = await Enterprise.findOne({ where: { ruc } })

    enterprise.status = status

    await enterprise.save()

    return res.status(200).json({
      updated: true,
      ruc,
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

module.exports = statusEnterprise