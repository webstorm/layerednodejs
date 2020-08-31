const Boom = require('@hapi/boom');
const ListUsers = require('../../application/use_cases/ListUsers');
const CreateUser = require('../../application/use_cases/CreateUser');
const GetUser = require('../../application/use_cases/GetUser');
const DeleteUser = require('../../application/use_cases/DeleteUser');


module.exports = {

  async createUser(request) {
    const ioc = request.server.app.ioc;
    const { firstName, lastName, email, password } = request.payload;
    const user = await CreateUser(firstName, lastName, email, password, ioc);
    return ioc.userSerializer.serialize(user);
  },

  async findUsers(request) {
    const ioc = request.server.app.ioc;
    const users = await ListUsers(ioc);
    return users.map(ioc.userSerializer.serialize)
  },

  async getUser(request) {
    const serviceLocator = request.server.app.serviceLocator;
    const userId = request.params.id;
    const user = await GetUser(userId, serviceLocator);
    if (!user) {
      return Boom.notFound();
    }
    return serviceLocator.userSerializer.serialize(user);
  },

  async deleteUser(request, h) {
    const serviceLocator = request.server.app.serviceLocator;
    const userId = request.params.id;
    await DeleteUser(userId, serviceLocator);
    return h.response().code(204);
  },

};
