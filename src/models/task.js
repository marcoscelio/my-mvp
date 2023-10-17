const getTaskModel = (sequelize, { DataTypes }) => {
    const Task = sequelize.define('task', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    Task.associate = (models) => {
        Task.belongsTo(models.User);
    };

    return Task;
};

module.exports = { getTaskModel };