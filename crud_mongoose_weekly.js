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
              //  console.log(data)
              //  mongoose.connection.close()
            })
            .catch((connectionError)=>{
                console.log(connectionError)
            })
/*
            app.get('/budget', (req, res) => {
                budgetsModel.find({})
                  .then((data) => {
                    
                    const budgetData = data.map(item => ({
                         title: item.title, 
                         budget: item.budget 
                        }));
                    res.json({ budget: budgetData});
                    
                  })
                  .catch((error) => {
                    res.status(500).json({ error: 'Internal Server Error' });
                  });
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
/*
            budgetsModel.find({})
                        .then((data)=>{
                            console.log(data)
                            mongoose.connection.close()
                        })
                        .catch((connectionError)=>{
                            console.log(connectionError)
                        })
            
*/
            app.use('/', express.static('public'));
            const port = 3000;
            app.listen(port, () =>{
                console.log(`Example app listening at http://localhost:${port}`)
            });
        })
        .catch((connectionError)=>{
            console.log(connectionError)
        })