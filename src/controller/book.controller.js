import cloudinary from "../lib/cloudinary.js";
import BookModel from "../models/book.model.js";

export const getBook = async (req, res) => {
  try {
const page = req.query.page || 1;
const limit = req.query.limit || 5
const skip =  (page - 1 )* limit;

    const books = await BookModel.find()
    .sort({ createdA: -1})
    .skip(skip)
    .limit(limit)
    .populate("user", "user  profileImage");

    const totalBooks = await BookModel.countDocuments()

    res.send({
        books,
        currentPage: page,
        totalBooks,
        totalPages: Math.ceil(totalBooks  / limit)
   })
    
    return res.status(200).json({
        success: true,
        data: books
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server error",
    });
  }
};

export const singleBook = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server error",
    });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, rating, image } = req.body;
    if (!title || !author || !rating || !image) {
      return res.status(400).json({ message: "please fill in all form" });
    }
   const uploadResponse =  await cloudinary.uploader.upload(image,{
    folder: "book"
   })
   

   const book = await BookModel.create({
    title,author,
    rating,
    image: uploadResponse.secure_url,
    user: req.user._id
   })

    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data:book
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server error",
    });
  }
};

export const updateBook = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server error",
    });
  }
};

export const deleteBook = async(req, res) => {

           const {id} = req.params
if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({ message: ' Invalid id'})
}
  try {
const book = await BookModel.findById(id)
if(!book){
    return res.status(400).json({ message: "Book not found"})
}

if(req.user.toString() !== book.user._id.toString()){
    return res.status(401).json({ message: 'Unauthrorized '})
}

if(book.image && book.image.includes("cloudinary")) {

    try {
         const publicId = book.image.split('/').pop()
    await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.log("Error deleting image ffom cloudinary:", error)
        
    }
   

}
await book.deleteOne()
return res.status(200).json({message: "Book deleted successful"})
    
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server error",
    });
  }
};
