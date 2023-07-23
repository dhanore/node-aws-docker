const { OIDCStrategy } = require('passport-azure-ad');
const User = require('../models/userModels');
const { POLICYURL, CLIENTID, POLICYNAME } = require('./config');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.oid);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    new OIDCStrategy(
      {
        identityMetadata: `https://bbcstudioscustomeridint.b2clogin.com/bbcstudioscustomeridint.onmicrosoft.com/B2C_1A_BBCLOGIN_SIGNIN/v2.0/.well-known/openid-configuration`,
        clientID: CLIENTID,
        audience: CLIENTID,
        policyName: POLICYNAME,
        responseType: 'code',
        responseMode: 'form_post',
        redirectUrl: 'http://localhost:3000/api/v1/auth/openid/return',
        allowHttpForRedirectUrl: true,
        clientSecret: 'nbz8Q~ElDfPJWPsNAGOCmPjb2uiQfyv49r1aJa4k',
        validateIssuer: false,
        passReqToCallback: true,
        scope: ['openid', 'profile'],
        isB2C: true,
        // clientID: CLIENTID,
        // audience: CLIENTID,
        // policyName: POLICYNAME,
        // isB2C: true,
        // validateIssuer: false,
        // loggingLevel: info,
        // passReqToCallback: true
      },
      (req, iss, sub, profile, accessToken, refreshToken, done) => {
        // Check if the user exists in the database, if not, create a new user record
        User.findOne({ oid: profile.oid }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              oid: profile.oid,
              displayName: profile.displayName,
              email: profile.emails ? profile.emails[0].value : null,
            });
            newUser.save((err) => {
              if (err) {
                return done(err);
              }
              return done(null, newUser);
            });
          }
        });
      }
    )
  );
};