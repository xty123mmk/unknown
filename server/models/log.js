import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const logSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: String,
});

export default mongoose.model('Log', logSchema);
