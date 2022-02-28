module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    
    age: DataTypes.STRING,
    address: DataTypes.STRING,
    education: DataTypes.STRING,
    gender: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
    // Post.hasMany(models.Comment, {
    //   foreignKey: 'postId',
    //   as: 'comments',
    //   onDelete: 'CASCADE',
    // });

    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'Users',
      onDelete: 'CASCADE',
    })
  };
  return Profile;
};

// database/models/