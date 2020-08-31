'use strict';

const mongoose = require('mongoose');


module.exports = ({url, user, pswd, schema}) => mongoose.connect(`mongodb://${user}:${pswd}@${url}:27017/${schema}`, { useNewUrlParser: true, useUnifiedTopology: true  });

