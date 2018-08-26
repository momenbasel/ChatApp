var moment = require('moment');


var generateMessage = (from,message) => {
  return {
    from,
    message,
    createdAt: moment().valueOf()
  }
};


var generateLocationMessage = (from,lat,long) => {
  return  {
    from,
    url:`https://www.google.com/maps?q=${lat},${long}`,
    createdAt: moment().valueOf()
  }
};
module.exports = {
  generateMessage , generateLocationMessage
};
