const services = {};
module.exports.register = (serviceName, Implementation) => (services[serviceName] = Implementation, services);
module.exports.getInstance = () => services;
module.exports.resolve = (serviceName) => services[serviceName];
