import mongoose from 'mongoose';
import Testimonial from '../models/testimonials';

export function createTestimonial(req, res) {
   const testimonial = new Testimonial({
     _id: mongoose.Types.ObjectId(),
     text: req.body.text,
   });
   if (!testimonial.text) {
     return res.status(400).json({
       status: false,
       message: 'Please do enter some text',
     });
   }
   return testimonial
    .save()
    .then((newTestimonial) => {
      return res.status(201).json({
        success: false,
        message: 'New testimonial created',
        newTestimonial,
      });
    })
    .catch(() => res.status(500).json({ success: false, message: 'Oops, server is down. Please try again shortly',
  }));
}

export function getSingleTestimonial(req, res) {
  const id = req.params.testimonialId;
  Testimonial.findById(id)
    .select('text')
    .then(singleTestimonial =>
      res.status(200).json({
        singleTestimonial,
      }))
    .catch(() => res.status(500).json({
      success: false,
      message: 'This testimonial does not exist.',
    }));
}

export function getAllTestimonial(req, res) {
  Testimonial.find()
    .select('text')
    .sort({ date: 'asc' })
    .exec()
    .then((allTestimonial) => {
      res.status(200).json({
        success: true,
        message: 'A list of all testimonial',
        allTestimonial,
      });
    })
    .catch(() => res.status(500).json({
      success: false,
      message: 'Oops, server is down. Please try again shortly',
    }));
}

export function updateTestimonial(req, res) {
  const id = req.params.testimonialId;
  const updateObject = req.body;
  Testimonial.update({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: `Hello ${user.firstname}, you\'ve successfully updated your testimonial`,
        updatedTestimonial: updateObject,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: 'Server error. Please try again',
      });
    });
}

export function deleteTestimonial(req, res) {
  const id = req.params.testimonialId;
  Testimonial.findByIdAndRemove(id)
    .select('_id')
    .exec()
    .then(() => res.status(204).json({
      message: 'Your testimonial is deleted',
    }))
    .catch(() => res.status(500).json({
      message: 'Oops, server is down. Please try again shortly',
    }));
}

export default Testimonial;

