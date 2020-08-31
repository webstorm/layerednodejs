'use strict';

const User = require('../../domain/User');
const UserRepository = require('../../domain/UserRepository');

module.exports = class extends UserRepository {

  _initializeRepositoryWithTwoUsers() {
    const john = new User(null, 'John', 'Doe', 'john.doe@mail.com', 'ABCD1234');

    const jane = new User(null, 'Jane', 'Smith', 'jane.smith@mail.com', 'EFGH5678');
    jane.deactivate()
    this.persist(john).then(() => this.persist(jane));
  }

  _dataAsArray() {
    return Object.keys(this.data).map(key => this.data[key]);
  }

  constructor() {
    super();
    this.index = 1;
    this.data = {};
    this._initializeRepositoryWithTwoUsers();
  }

  async persist(userEntity) {
    const row = Object.assign({}, userEntity);
    const rowId = this.index++;
    row.id = rowId;
    this.data[rowId] = row;
    return row;
  }

  async merge(userEntity) {
    let row = this.data[userEntity.id];
    Object.assign(row, userEntity);
    return row;
  }

  async remove(userId) {
    delete this.data[userId];
    return true;
  }

  async get(userId) {
    const row = this.data[userId];
    return new User(row.id, row.firstName, row.lastName, row.email, row.password, row.active)
  }

  getByEmail(userEmail) {
    const users = this._dataAsArray();
    return Promise.resolve(users.find(user => user.email === userEmail));
  }

  find() {
    return Promise.resolve(this._dataAsArray());
  }

};
