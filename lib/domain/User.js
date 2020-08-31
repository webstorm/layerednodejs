module.exports = class {

  constructor(id = null, firstName, lastName, email, password, active) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.active = active;
    this.isDeleted = false;
  }

  deactivate() {
    this.active = false;
    return this;
  }

  activate() {
    this.active = true;
    return this;
  }

  delete() {
    this.isDeleted = true;
    return this;
  }

  isActive() {
    return (true === this.active);
  }

  isDeleted() {
    return (true === this.isDeleted);
  }

};
