const withImages = require('next-images');
module.exports = withImages();

module.exports = {
  crossOrigin: 'anonymous',
  reactStrictMode: true,
  images: {
    domains : ["via.placeholder.com"]
  }
}
