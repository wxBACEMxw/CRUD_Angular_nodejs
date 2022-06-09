const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

// Load in the mongoose models
const { List, Task, User } = require('./db/models');

//const jwt = require('jsonwebtoken');


/* MIDDLEWARE  */

// Load middleware
app.use(bodyParser.json());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

/**
 * GET /lists
 * Purpose: Get all lists
 */
 app.get('/lists', (req, res) => {
    // We want to return an array of all the lists that belong to the authenticated user 
    List.find().then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * POST /lists
 * Purpose: Create a list
 */
app.post('/lists', (req, res) => {
    // We want to create a new list and return the new list document back to the user (which includes the id)
    // The list information (fields) will be passed in via the JSON request body
    let title = req.body.title;

    let newList = new List({
        title,
    });
    newList.save().then((listDoc) => {
        // the full list document is returned (incl. id)
        res.send(listDoc);
    })
});


app.patch('/lists/:id', (req, res)=>{
    List.findOneAndUpdate ({ _id: req.params.id }, {
        $set: req.body
    }).then(() =>{
        res.send(200);
    });
});


app.delete('/lists/:id', (req, res)=>{
    List.findByIdAndRemove({_id: req.params.id}).then((removedListDoc)=>{
        res.send(removedListDoc);
    })
}); 


/**
 * Get lists/listId/tasks
 */

app.get('/lists/:listId/tasks',(req, res)=>{
    Task.find({
        _listId : req.params.listId
    }).then((tasks)=>{
        res.send(tasks);
    })
});

/**
 * Post lists/:id/tasks
 */


app.post('/lists/:listId/tasks',(req, res)=>{
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });

    newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc);
    })
});

app.patch('/lists/:listId/tasks/:taskId', (req, res)=>{
    Task.findByIdAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    },{
        $set: req.body
    }).then(()=>{
        res.sendStatus(200);
    })
});

app.delete('/lists/:listId/tasks/:taskId', (req, res)=>{
    Task.findByIdAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc)=>{
        res.send(removedTaskDoc);
    })
});




app.get('/lists/:listId/tasks', (req, res)=>{
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task)=>{
        res.send(task);
    })
});





app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})