const getUserModel = (sequelize, { DataTypes }) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    User.associate = (models) => {
        User.hasMany(models.Task);
    };

    return User;
};

module.exports = { getUserModel };