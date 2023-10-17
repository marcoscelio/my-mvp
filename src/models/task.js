const getTaskModel = (sequelize, { DataTypes }) => {
    const Task = sequelize.define('task', {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    Task.associate = (models) => {
        Task.belongsTo(models.User, { as: 'User', foreignKey: 'user_id' });
    };

    return Task;
};

module.exports = { getTaskModel };