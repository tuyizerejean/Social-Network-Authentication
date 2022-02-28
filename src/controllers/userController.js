const models = require('../models');
const createProfile = async (req, res) => {
  try {
      const user = {
          name:req.user._json.name, 
        googleId:req.user._json.sub,
        email:req.user._json.email
    }
    const profile = await models.User.create(user);
    return res.status(201).json({
        profile,
    });
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

module.exports = {
    createProfile,
}