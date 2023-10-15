const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
const budgetsModel = require('./models/budget_info_schema')

let url = 'mongodb://127.0.0.1:27017/mongodb_demo';

mongoose.connect(url)
        .then(()=>{
            console.log('Connected to database')

            budgetsModel.find({})
            .then((data)=>{
            })
            .catch((connectionError)=>{
                console.log(connectionError)
            })


            app.post('/add-budget', (req, res)=>{

             // const { title, budget, color } = req.body;
              
              const newData = {
                title: req.body.title,
                budget: req.body.budget,
                color: req.body.color,
              };
              budgetsModel.insertMany([newData])
              .then((data)=>{
                console.log('added data correctly');
                console.log(data);
                res.status(200).json({ message: 'Data added successfully' });
                mongoose.connection.close();
              }).catch((error)=>{
                console.error('error adding data', error)
                res.status(500).json({ error: 'Internal Server Error' });
              });
            });
            
              app.get('/budget', (req, res) => {
                budgetsModel.find({})
                  .then((data) => {
                    const budgetData = data.map(item => ({
                      title: item.title,
                      budget: item.budget,
                      color: item.color
                    }));
                    res.json( budgetData );

                  })
                  .catch((error) => {
                    res.status(500).json({ error: 'Internal Server Error' });
                  });
              });

            app.use('/', express.static('public'));
            const port = 3000;
            app.listen(port, () =>{
                console.log(`Example app listening at http://localhost:${port}`)
            });
        })
        .catch((connectionError)=>{
            console.log(connectionError)
            console.error('Error connecting to the database:', connectionError);
        })