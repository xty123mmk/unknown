'use strict';

import { use } from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';
var User = require('mongoose').model('User');

export default function () {

  use(new FacebookTokenStrategy({
      clientID: '2344581448901716',
      clientSecret: '4134216335b56b18a36a8750c150ef89'
    },
    function (accessToken, refreshToken, profile, done) {
      User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
        return done(err, user);
      });
    }));

};