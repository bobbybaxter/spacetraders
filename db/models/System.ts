import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  const System = sequelize.define('System', {
    symbol: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      field: 'symbol',
    },
    sectorSymbol: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'sector_symbol',
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

  System.associate = (models: any) => {
    System.hasMany(models.SystemWaypoint, {
      foreignKey: 'symbol',
      as: 'waypoints',
    });
  };

  return System;
};
