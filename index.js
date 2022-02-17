
const express = require('express');
const path = require('path');
const app = express();
const data = require('./movieData');
const mongoose = require("mongoose");
const User = require("./model");

//바디가 json 형태로 받을 수 있음.
app.use(express.json());
//폼 데이터 받은 것을 사용 할 수 있다.
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
});

function middle1(req, res, next) {
    req.params.temp = 'data in the middle of.'
    console.log("middle process");
    next();
}
//app.use(middle1)
//위와 같이 적으면 모든 곳에서 중간과정에서 저 함수를 다 거치게됨.
app.get('/middle', middle1, (req, res) => {
    console.log('last process >>>>', req.params.temp);
    res.send("middle hi");
});

app.post("/login", (req, res) => {
    const { id, pw } = req.body;
    // mongodb find ===  배열 매소드 filter
    // mongodb findOne === 배열 매소드 find
    User.findOne({ id: id })
        .then((result) => {
            console.log(result);
            if (result.pw === pw) {
                res.send({
                    status: "login success",
                });
            } else {
                res.send({
                    status: "wrong password",
                });
            }
        })
        .catch((err) => {
            res.send({
                status: "id doesn't exist",
            });
        });
});

app.post('/register', (req, res) => {
    const { id, pw } = req.body;

    const newUser = new User({
        id: id,
        pw: pw
    })

    newUser.save()
        .then((v) => {
            res.send({
                status: "register succ"
            })
        })
        .catch((e) => {
            res.send({
                status: "register fail"
            })
        });
})



// function movieSearch(name) {
//     return data.movieData.filter((v) => {
//       return v.name.includes(name);
//     });
// }

// app.get('/search', (req, res) => {
//     res.send({
//         status: 'succ',
//         method: req.method
//     });
// });


// app.post('/search', (req, res) => {
//     const name = req.body.name;
//     const result = movieSearch(name);
//     res.send({
//         result
//     });
// });

// app.post("/sum", (req, res) => {
//     const arr = req.body.arr;
//     console.log(req.body);
//     res.send({
//       result: arr.reduce((a, b) => a + b),
//     });
// });
// 이 방식은 함수를 한개밖에 못 넣어서 아쉬움
// app.get("/search2/:name", (req, res) => {
//     const name = req.params.name

//     const result = movieSearch(name);
//     res.send({
//       result,
//     });
// });


//쿼리를 사용하면 ?로 구분하기  때문에 여러가지 데이터를 보낼 수 있음.
// app.get("/search", (req, res) => {
//     const query = req.query;
//     console.log(query);
//     const name = req.query.name;
//     const result = movieSearch(name);
//     res.send({
//       result,
//     });
//   });


app.listen(3000, () => {
    console.log('3000 port server on')

    mongoose.connect(
        "mongodb://localhost:27017/elice",
        (err) => {
            console.log("MongoDB Connect");
        }
    );
})