const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsTo(models.Lesson);
    }
  }
  Booking.init({
    date: DataTypes.DATEONLY,
    verified: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Training',
  });
  return Booking;
};
