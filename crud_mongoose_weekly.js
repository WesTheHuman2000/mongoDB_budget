const express = require('express');
const mongoose = require('mongoose');

const app = express();

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
              const newData = {
                title: 'New Title',
                budget: 100,
                color: '#ff0000',
              };
              budgetsModel.insertMany([newData])
              .then((data)=>{
                console.log('added data correctly');
                console.log(data);
              }).catch((error)=>{
                console.error('error adding data', error)
              });
            });
            /*
            budgetsModel.insertMany({title:'test title postman', budget:50, color: '#cc3300'})
                      .then((data)=>{
                          console.log(data)
                          console.log('Added data correctly')
                          
                      })
                      .catch((connectionError)=>{
                          console.log(connectionError)
              });
              */
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
        })