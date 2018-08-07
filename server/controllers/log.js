import mongoose from 'mongoose';
import Log from '../models/log';
import { userInfo } from 'os';

export function createLog(req, res) {
  const log = new Log({
    _id: mongoose.Types.ObjectId,
    text: req.body.text,
  });
  return Log
    .save()
    .then((newLog) => {
      return res.status(201).json({
        message: `Hello ${user.firstName}, Thanks for adding this to your log`,
        newLog,
      });
    })
    .catch(() => {
      return res.status(500).json({
        message: 'Oops, server is down. Please try again shortly',
      });
    });
}

export function getAllLog(req, res) {
  Log.find()
    .select('text')
    .sort({ date: 'asc' })
    .exec()
    .then((allLog) => {
      res.status(200).json({
        success: true,
        message: 'A list of all log',
        allLog,
      });
    })
    .catch(() => res.status(500).json({
      success: false,
      message: 'Oops, server is down. Please try again shortly',
    }));
}

export function updateLog(req, res) {
  const id = req.params.logId;
  const updateObject = req.body;
  Log.update({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        message: `Hello ${user.firstname}, you\'ve successfully updated your log`,
        updateLog: updateObject,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: 'Server error. Please try again',
      });
    });
}

export function deleteLog(req, res) {
  const id = req.params.logId;
  Log.findByIdAndRemove(id)
    .select('_id')
    .exec()
    .then(() => res.status(204).json({
      message: 'Your log is deleted',
    }))
    .catch(() => res.status(500).json({
      message: 'Oops, server is down. Please try again shortly',
    }));
}

export default Log;
