const models = require('../models');
const createProfile = async (req, res) => {
  try {
    const profile = await models.Profile.create(req.body);
    return res.status(201).json({
      message:"Created sussfully",
        profile,
    });
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}
const getAllProfile = async (req, res) => {
  try {
    const profile = await models.Profile.findAll({
      include: [
        {
          model: models.User,
          as: 'Users'
        },
      ]
    });
    return res.status(200).json({ profile });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}


const getProfileById = async (req, res) => {
  try {
    const { profileId } = req.params;
    const profile = await models.Profile.findOne({
      where: { id: profileId },
      include: [
        {
          model: models.User,
          as: 'Users'
        }
      ]
    });
    if (profile) {
      return res.status(200).json({ message:"Retrieved successfully",profile });
    }
    return res.status(404).send('Profile with the specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
const deleteProfile = async (req, res) => {
  try {
    const { profileId } = req.params;
    const deleted = await models.Profile.destroy({
      where: { id: profileId }
    });
    if (deleted) {
      return res.status(204).send("Profile deleted succesefully");
    }
    throw new Error("Profile not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateProfile = async (req, res) => {
  try {
    const { profileId } = req.params;
    const [ updated ] = await models.Profile.update(req.body, {
      where: { id: profileId }
    });
    if (updated) {
      const updatedProfile = await models.Profile.findOne({ where: { id: profileId } });
      return res.status(200).json({ post: updatedProfile });
    }
    throw new Error('Profile  not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }


};
module.exports = {
    createProfile,
    getAllProfile,
    getProfileById,
    updateProfile,
    deleteProfile
}