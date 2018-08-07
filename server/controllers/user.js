import mongoose from 'mongoose';
import cloudinary from 'cloudinary';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/user';
import createToken from '../middleware/token';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: 861873682179917,
  api_secret: process.env.api_secret,
});


export function userSignup(req, res) {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    const password = hash;
    const user = new User({
      _id: mongoose.Types.ObjectId(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password,
    });
    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      return res.status(400).json({
        message: 'Kindly fill your first name, last name, email and password', 
      });
    }
    return User.count({
      $or: [
        { email: req.body.email },
      ],
    })
    .then((count) => {
      if (count > 0) {
        return res.status(400).json({
          message: 'User exist',
        });
      }
      return user
        .save()
        .then((newUser) => {
          const token = createToken(newUser);
          return res.status(201).json({
            message: `Hello ${newUser.firstName}, We have successfully created an account for you`,
            newUser: {
              userId: newUser.id,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
            },
            token,
          });
        })
        .catch(() => {
          return res.status(500).json({
            message: 'Oops, server is down. Please try again shortly',
          });
        });
      });
  });
}

export function userLogin(req, res) {
  const { email, password } = req.body;
  User.findOne({ email })
    .exec()
    .then((user) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(400).json({
            message: 'You are not authorize to view this account',
          });
        }
        if (result) {
          const token = createToken(result);
          return res.status(200).json({
            message: `You are welcome, ${user.firstName}`,
            user: {
              username: user.username,
              id: user.id,
            },
            token,
          });
        }
        return res.status(400).json({
          message: 'Wrong email/password',
        });
      });
    })
    .catch(() => {
      return res.status(500).json({
        message: 'Oops, server is down. Please try again shortly',
      });
    });
}

export function userProfile(req, res) {
  cloudinary.v2.uploader.upload(req.files.userImage.path, (error, result) => {
    console.log(result, error);
    const id = req.params.userId;
    User.findByIdAndUpdate(id, {
      username: req.body.username,
      userImage: result.secure_url,
    }, { new: true })
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).json({
            success: false,
            message: 'No user found',
          });
        }
        return res.status(201).json({
          success: true,
          message: 'Your profile has been updated',
          User: {
            _id: updatedUser.id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            username: updatedUser.username,
            email: updatedUser.email,
            userImage: result.secure_url,
          },
        });
      })
      .catch(() => {
        res.status(500).json({
          message: 'Oops, server is down. Please try again shortly',
        });
      });
  });
}

export function getSingleUser(req, res) {
  const id = req.params.userId;
  User.findById(id)
    .then(singleUser =>
      res.status(200).json({
        success: true,
        message: `This is the available information for ${singleUser.firstName}`,
        user: {
          _id: singleUser.id,
          firstName: singleUser.firstName,
          lastName: singleUser.lastName,
          email: singleUser.email,
          userImage: singleUser.userImage,
        },
      }))
    .catch(() => res.status(500).json({
      success: false,
      message: 'This user does not exist.',
    }));
}

export function getAllUser(req, res) {
  User.find()
    .select('_id firstName userImage')
    .then((newUsers) => {
      const response = {
        success: true,
        allUsers: newUsers.map(newUser => ({
          id: newUser.id,
          firstName: newUser.firstName,
          userImage: newUser.userImage,
        })),
      };
      res.status(200).json(response);
    })
    .catch(() => res.status(500).json({
      success: false,
      message: 'Oops, server is down. Please try again shortly',
    }));
}

export default User;
