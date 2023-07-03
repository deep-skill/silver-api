const { User } = require('../../database')

const authController = async (id, name, email, ) => {
    const [_, created] = await User.findOrCreate({
      where: {
        id: id
      },
      defaults: {
        name: name,
        email: email
      }
    })

    return created
  }
  


module.exports = authController