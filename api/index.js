const router = require('express').Router();
const express = require('express');
const { body } = require('express-validator');
const bd = require("body-parser")
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("./models/User");
const Post = require("./models/Post");
const Category = require("./models/Category")
const cors = require("cors");
const { route } = require('express/lib/router');
const path = require("path")
app.use(cors())
app.use(bd.json());
app.use("/images", express.static(path.join(__dirname, "/images")))
dotenv.config();
const multer = require("multer");
const { dirname } = require('path');
//MONGOOSE
mongoose.
connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify:true
    })
    .then(console.log("Connected To MongoDB!!"))
    .catch((err) => console.log(err));

router.use("/", (req, res) => {
    console.log("Port Working")
})

//AUTHENTICATION APIS
//SIGNED UP
app.post("/user/signup", async(req, res) => {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        let userCreate = new User({ username: req.body.username, email: req.body.email, password: hashedPass })
        userCreate.save()
            .then((response) => {
                // console.log(response,"success")
                res.status(200).send({ result: response, message: "stored" })
            })
            .catch((err) => {
                // console.log(err,"erroorr")
                res.status(500).send({ result: err, message: "not stored" })
            })

    })
    ////  LOGIN API

app.get("/user/login/:username/:password", async(req, res) => {
        try {
            const user = await User.findOne({ username: req.params.username })
            const validated1 = await bcrypt.compare(req.params.password, user.password)
            const user1 = await User.findOne({ username: req.params.username })
            .then((response)=>{
              console.log(response)
              if(validated1===true){
              res.json([
                response,
                {
                message:"suc"
                }
              ]
                )
              }
              else{
                res.json({
                  message:"Wrong Password"
                })
              }
            })
            !user && res.status(400).json("Wrong Username");
            res.json({
                message: "Logged In"
            });
            const validated = await bcrypt.compare(req.params.password, user.password);
            !validated && res.status(400).json("Wrong password");

            const { password, ...others } = user._doc;
            res.status(200).json(others);
        } catch (error) {
            res.status(500).json(error)
        }
    })
    ////
    //USERS API
    //UPDATE USER API
app.put("/user/update/:id", async(req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,

            }, { new: true });
            res.status(200).json(updatedUser)

        } catch (error) {
            res.status(500).json(error)
        }
    } else
        res.status(401).json("You can update only your account!")


});


//DELETE USER API
app.delete("/user/delete/:id", async(req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {

                await Post.deleteMany({ username: user.username });
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User Deleted")
            } catch (error) {
                res.status(500).json("User Not Found !");
            }
        } catch (error) {
            res.status(401).json("User Not Found");
        }
    } else
        res.status(401).json("You can delete only your account!")
});


//GET USER
app.get("/user/getuser/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json()
    }
})

///POSTS APIS
//Create POST
app.post("/posts/createpost", async(req, res) => {
  let postcreate = new Post({ title: req.body.title, desc: req.body.desc, username: req.body.username })
  postcreate.save()
      .then((response) => {
          // console.log(response,"success")
          res.status(200).send({ result: response, message: "stored" })
      })
      .catch((err) => {
          // console.log(err,"erroorr")
          res.status(500).send({ result: err, message: "not stored" })
      })
    // const newPost = new Post(req.body);
    // try {
    //     const savedPost = await newPost.save();
    //     res.status(200).json(savedPost);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
});

//UPDATE POST
app.put("/posts/updatepost/:id", async(req, res) => {
  Post.findOneAndUpdate({ _id: req.params.id }, {
    $set: { title: req.body.title, desc: req.body.desc, username: req.body.username }
})
.then(result => {
    res.status(200).json({
        message: "update data",
        updateData: result
    })
})
.catch(err => {
    res.status(500).json({
        message: "not update data",
        error: err
    })
})
    // try {
    //     const post = await Post.findById(req.params.id);
    //     if (post.username === req.body.username) {
    //         try {
    //             const updatedPost = await Post.findByIdAndUpdate(
    //                 req.params.id, {
    //                     $set: req.body,
    //                 }, { new: true }
    //             );
    //             res.status(200).json(updatedPost);
    //         } catch (err) {
    //             res.status(500).json(err);
    //         }
    //     } else {
    //         res.status(401).json("You can update only your post!");
    //     }
    // } catch (err) {
    //     res.status(500).json(err);
    // }
});

//DELETE POST
app.delete("/posts/delete/:id", async(req, res) => {
  Post.remove({ _id: req.params.id })
  .then(result => {
      res.status(200).json({
          message: "deleted data",
          result: result
      })
  })
  .catch(err => {
      res.status(500).json({
          message: "not deleted data",
          error: err
      })
  })
    // try {
    //     const post = await Post.findById(req.params.id);
    //     if (post.username === req.body.username) {
    //         try {
    //             await post.delete();
    //             res.status(200).json("Post has been deleted...");
    //         } catch (err) {
    //             res.status(500).json(err);
    //         }
    //     } else {
    //         res.status(401).json("You can delete only your post!");
    //     }
    // } catch (err) {
    //     res.status(500).json(err);
    // }
});

//GET POST
app.get("/posts/getpost/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET ALL POSTS
app.get("/posts/getAllpost", async(req, res) => {
  try {
    const cats = await Post.find();
    res.status(200).json(cats);
} catch (err) {
    res.status(500).json(err);
}
    // const username = req.query.user;
    // const catName = req.query.cat;
    // try {
    //     let posts;
    //     if (username) {
    //         posts = await Post.find({ username });
    //     } else if (catName) {
    //         posts = await Post.find({
    //             categories: {
    //                 $in: [catName],
    //             },
    //         });
    //     } else {
    //         posts = await Post.find();
    //     }
    //     res.status(200).json(posts);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
});
//CATEGOGY APIS
// CREATE CATEGORY
app.post("/category/createcategory/", async(req, res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (err) {
        res.status(500).json(err);
    }
});
// GET CATEGORY  
app.get("/category/getcategories/", async(req, res) => {
    try {
        const cats = await Category.find();
        res.status(200).json(cats);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPLOAD IMAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "hello.jpg");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/image/upload/", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});
//   
app.listen("5000", () => {});
module.exports = router;



//   AUTHENTICATION APIs
//       SIGNUP = "/user/signup"
//       LOGIN  ="user/login"
//   USER APIs
//        UPDATE USER   ="" /user/update/:id
//        DELETE USER = "/user/delete/:id"
//        GET USER =  "/user/getuser/:id"
//   POST APIs
//        CREATE POST "/posts/createpost"
//        UPDATE POST "/posts/updatepost/:id"
//        DELETE POST "/posts/delete/:id"
//        GET POST BY ID "/posts/getpost/:id"
//        GET ALL POSTS"/posts/getAllpost/"
//   CATEGORY APIs
//        CREATE CATEGORY "/category/createcategory/"
//        GET ALL CATEGORIES "/category/getcategories/"