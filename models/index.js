const User = require('./User');
const Gallery = require('./Gallery');
const Painting = require('./Painting');
const Dashboard = require('./Dashboard');
const Blog = require('./Blog');

Gallery.hasMany(Painting, {
  foreignKey: 'gallery_id',
});

Painting.belongsTo(Gallery, {
  foreignKey: 'gallery_id',
});



module.exports = { User, Gallery, Painting, Dashboard, Blog };
