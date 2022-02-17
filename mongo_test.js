const mongoose = require("mongoose");
const User = require("./model");

// mongodb+srv://admin:1234@cluster0.yfbio.mongodb.net/elice

mongoose.connect(
  "mongodb://localhost:27017/elice",
  (err) => {
    console.log("MongoDB Connect");

    // const newUser = new User({
    //     id: "eli",
    //     pw: "1234"
    // })

    // newUser.save()
    //     .then((v) => console.log("success"))
    //     .catch((e) => console.log("fail"));

    User.find({id: "eli"}).then(r => console.log(r));
  }
);