const db = require('../models');
const Comment = db.comments;

//membuat komentar(post)
exports.buat = async (req, res) => {
       try {
              const {
                     postId,
                     userId,
                     content
              } = req.body;

              await Comment.create({
                     postId,
                     userId,
                     content
              });

              return res.status(201).json({
                     message: "Your comment has been submitted!"
              });
       } catch (error) {
               console.error(error);
              return res.status(500).json({
                     message: "Your comment failed to submit!"
              })
       }
};


//get comment
exports.getComment = async (req, res) => {
       try {
           const comments = await Comment.findAll({
               order: [['createdAt', 'DESC']]
           });
   
           return res.status(200).json({
               data: comments
           })
       } catch (error) {
           console.error(error);
           return res.status(500).json({
               message: error
           });
       }
   };

 //get comment by id
   exports.getCommentById = async (req, res) => {
       try {
           const { commentId } = req.params; 
           const data = await Comment.findByPk(commentId);
   
           if (data) {
               return res.status(200).json({
                   data
               });
           } else {
               return res.status(404).json({
                   message: "Comment not found",
               });
           }
       } catch (error) {
           console.error(error);
           return res.status(500).json({
               message: error
           });
       }
   };


//update komentar
exports.updateComment = async (req, res) => {
       try {
           const { commentId } = req.params;
           const { content } = req.body;
     
           const existsComment = await Comment.findOne({
               where: {
                   commentId,              
               },
           });
   
           if (existsComment) {
               existsComment.content = content;
              
               await existsComment.save();
               return res.status(200).json({
                   message: "Your comment has been updated!",
               });
           } else {
               return res.status(404).json({
                   message: "Your comment failed to updated!",
               });
           }
       } catch (error) {
           console.error(error);
           return res.status(500).json({
               message: error
           })
       }
   };


//delete komentar
exports.destroyComment = async (req, res) => {
       try {
              const { commentId } = req.params;

              const existsComment = await Comment.findOne({
                     where: {
                            commentId,
                     },
              });

              if (existsComment) {
                    
                     await existsComment.destroy();
                     return res.status(200).json({
                         message: "Your comment has been deleted!",
                     });
                 } else {
                     return res.status(404).json({
                         message: "Your comment failed to deleted!",
                     });
                 }
             } catch (error) {
                 console.error(error);
                 return res.status(500).json({
                     message: error
                 })
       }
};
