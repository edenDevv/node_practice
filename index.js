const express = require('express');
const app = express();
const data = require('./movieData');

function movieSearch(name) {
    return data.movieData.filter((v) => {
      return v.name.includes(name);
    });
}
// 이 방식은 함수를 한개밖에 못 넣어서 아쉬움
app.get("/search2/:name", (req, res) => {
    const name = req.params.name
    
    const result = movieSearch(name);
    res.send({
      result,
    });
});

//쿼리를 사용하면 ?로 구분하기  때문에 여러가지 데이터를 보낼 수 있음.
app.get("/search", (req, res) => {
    const query = req.query;
    console.log(query);
    const name = req.query.name;
    const result = movieSearch(name);
    res.send({
      result,
    });
  });



app.get("/movie", (req, res) => {
    res.send({
        'result': data
    })
})


app.listen(3000, ()=> {
    console.log('3000 port server on')
})