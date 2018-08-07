import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const testimonialSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: {
    type: String, 
    required: true,
  },
});

export default mongoose.model('Testimonial', testimonialSchema);
