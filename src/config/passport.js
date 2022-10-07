const passport = require('passport');
const passportJwt = require('passport-jwt');

const secret = 'secret';
const JwtStrategy = passportJwt.Strategy;
const { ExtractJwt } = passportJwt;

module.exports = (app) => {
  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };
  const strategy = new JwtStrategy(params, (payload, done) => {
    app.services.users.findAll({ id: payload.id }).then((users) => {
      if (users.length > 0) done(null, { ...payload });
      else done(null, false);
    }).catch((err) => done(err, false));
  });

  passport.use(strategy);

  return {
    authenticate: () => passport.authenticate('jwt', { session: false }),
  };
};
