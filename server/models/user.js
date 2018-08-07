import mongoose from 'mongoose';
import { access } from 'fs';

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
  },
  phone: {
    type: String,
  },
  userImage: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, 'This email is invalid'],
  },
  password: {
    type: String,
  },
  facebookProvider: {
    type: {
        id: String,
        token: String
    },
    select: false
  },
});

userSchema.set('toJson', {getters: true, virtuals: true});

userSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
  const that = this;
  return this.findOne({
    'facebookProvider.id': profile.id
  }, function(err, user) {
    if (!user) {
      const newUser = new that({
        email: profile.emails[0].value,
        facebookProvider: {
          id: profile.id,
          token: accessToken
        }
      });

      newUser.save(function(error, savedUser) {
        if (error) {
          console.log(error);
        }
        return cb(error, savedUser);
      });
    } else {
      return cb(err, user);
    }
  });
};

export default mongoose.model('User', userSchema);
