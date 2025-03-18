import express, { response } from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
// const API_URL = 'https://api.genderize.io?name=peter';

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
  res.render('index.ejs');
});


app.post("/get-gender",async (req, res) => {
  const name = req.body.name;
  try{
    const result = await axios.get(`https://api.genderize.io?name=${name}`);
    res.render("index.ejs",{name,gender:result.data.gender});
  }
  catch(error){
   res.render("index.ejs", { error: "failed to fetch data. try again!" });  
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



