export const checkAuthor = (req,res,next)=>{

 if(req.user.role !== "author"){
  return res.status(403).json({message:"author access only"})
 }

 next()

}