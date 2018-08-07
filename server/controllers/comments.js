import mongoose from 'mongoose';
import Comment from '../controllers/testimonials';
import Testimonial from '../controllers/testimonials';

export function createComment(req, res) {
  const comment = new Comment({
    _id: mogoose.Types.ObjectId(),
    text: req.body.text,
  });
  return comment
    .save()
    .then((newComment) => {
      return res.status(201).json({
        message: 'Your comment is successsfully created',
        newComment,
      });
    })
    .catch(() => {
      return res.status(500).json({
        message: 'Oops, server is down. Please try again shortly',
      });
    });
}
export function getAllComment(req, res) {
  Testimonial.find()
    .select('text')
    .exec()
    .then((allComment) => {
      res.status(200).json({
        success: true,
        message: 'A list of all comment',
        allComment,
      });
    })
    .catch(() => res.status(500).json({
      success: false,
      message: 'Oops, server is down. Please try again shortly',
    }));
}

export function deleteComment(req, res) {
  const id = req.params.commentId;
  Comment.findByIdAndRemove(id)
    .select('_id')
    .exec()
    .then(() => res.status(204).json({
      message: 'Your comment is deleted',
    }))
    .catch(() => res.status(500).json({
      message: 'Oops, server is down. Please try again shortly',
    }));
}

export default Comment;
