module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', 
  {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true,
    }
  }
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Profile, {
      foreignKey: 'userId',
      as: 'Users',
      onDelete: 'CASCADE',
    });
    // User.hasMany(models.Comment, {
    //   foreignKey: 'userId',
    //   as: 'comments',
    //   onDelete: 'CASCADE',
    // });
  };
  return User;
};

// database/models/user.js