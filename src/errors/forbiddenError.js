module.exports = function (message = 'Este recurso não perctence ao usuário.') {
  this.name = 'ForbiddenError';
  this.message = message;
};
