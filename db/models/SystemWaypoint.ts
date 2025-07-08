import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  const SystemWaypoint = sequelize.define('SystemWaypoint', {
    symbol: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      field: 'symbol',
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'type',
    },
    x: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'x',
    },
    y: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'y',
    },
  });

  SystemWaypoint.associate = (models: any) => {
    SystemWaypoint.belongsTo(models.System);
  };

  return SystemWaypoint;
};
