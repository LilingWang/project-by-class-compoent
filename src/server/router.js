'use strict';
const express    = require('express');        
const router = express.Router();     

const armyData     = require('./armyData');

router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/getAllSolider', async (req, res) => {
    try {
        const result = await armyData.find();
        res.json(result)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/getSuperiorInfo', async (req, res) => {
   // console.log("test", req.body)
    const id = req.query["id"];
    try {
        const result = await armyData.find({_id: {$in: id}});
        res.json(result);

    } catch (error) {
        res.status(500).json({message: error.message});

    }
    
});

router.post('/deleteSolider', async (req, res) => {
    //console.log("hello", req)
    
    const id = req.query["id"];
    const numberOfDS = req.query["numberOfDS"];
    const superiorId = req.query["superiorId"];
    const nuOfDS = JSON.parse(numberOfDS);
    const nuOfDSData = Object.values(nuOfDS)
    console.log(nuOfDS, superiorId, Object.values(nuOfDS),typeof(nuOfDSData),nuOfDSData[0])

    if(nuOfDSData[0].length > 0){
        console.log("hi")
        armyData.deleteOne({_id: id})
        .then(result => {
            nuOfDSData[0].forEach(async item => {
                try {
                    await armyData.updateOne({ _id: item },{$set:{"Superior": [""]}});
                    res.json({message: result});
               
                  } catch (error) {
                    res.status(500).json({message: error.message});
                  }
            });
        })
        .catch(error => {
            res.status(500).json({message:error.message});
        });
        

    }else if(superiorId !== undefined){
        console.log("hi 2")
        armyData.deleteOne({_id: id})
        .then(result =>{
             
        })
        .catch(error => {
            res.status(500).json({message:error.message});
        })

    }
    
    else {
        try {
            await armyData.deleteOne({ _id: id });
            res.json({message: 'Success!'});
       
          } catch (error) {
            res.status(500).json({message: error.message});
          }
    }
    
    armyData.deleteOne





});

router.post('/addNewSolider', (req, res) =>{

    console.log(req.body)
    const {Name, Sex, Rank,Phone, Email, Avatar,Superior, NumberOfDS,StartDate} = req.body;
    //const NumberOfDs = [];
    const newSolider = new armyData();
    Object.assign(newSolider, {Name, Sex, Rank, Phone, Email,Avatar, Superior,NumberOfDS,StartDate});
    console.log("test new solider", newSolider);
    newSolider.save()
    .then(async result => {
       console.log("test suuperior",result, Superior[0])
       if(Superior[0] != null){
           console.log("1", result,result._id, result._id,Superior[1])
        try {
            await armyData.updateOne({ _id: Superior[1] },{$push:{NumberOfDS: result._id}});
            res.json({message: result});
       
          } catch (error) {
            res.status(500).json({message: error.message});
          }
            
        }else {
            return res.json({message:result});
        }
        
       // res.json({message:result})
    })
    .catch(error => {
        res.status(500).json({message:error.message});
    });
       /* res.json({message:'Success!'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }*/

    
});

router.post('/editSolider', (req, res) =>{

    const id = req.query["id"];
    const data = req.query["editSolider"];
    const numberOfDS = req.query["numberOfDS"];
    const Superior = [...JSON.parse(data).Superior];
    
    console.log("test data ---------:         ",numberOfDS !== undefined,id,Superior[0], Superior, JSON.parse(data).Superior);

    //console.log(req.body)
   // const {Name, Sex, Rank,Phone, Email, Avatar,Superior, NumberOfDS,StartDate} = req.body;
    //const NumberOfDs = [];
    armyData.updateOne({_id: id}, JSON.parse(data))
    .then(async result =>{
        console.log(result,"test.....")
        if(Superior[0] === null) return res.json({message:result});

        console.log("1", result,result._id, result._id,Superior[1])
     try {
         await armyData.updateOne({ _id: Superior[1] },{$push:{NumberOfDS: result._id}});
         res.json({message: result});
    
       } catch (error) {
         res.status(500).json({message: error.message});
       };
        
    })
    .then(result => {
        if(numberOfDS === undefined) return res.json({message: result});
        
        numberOfDS.forEach(async item => {
            try {
                await armyData.updateOne({ _id: item },{$set:{"Superior": [JSON.parse(data).Name, id]}});
               // res.json({message: result});
           
              } catch (error) {
                res.status(500).json({message: error.message});
              }
        });
             
    })
    .catch(error =>{
        res.status(500).json({message:error.message});
    })


    /*
    const newSolider = new armyData();
    Object.assign(newSolider, {Name, Sex, Rank, Phone, Email,Avatar, Superior,NumberOfDS,StartDate});
    console.log("test new solider", newSolider);
    newSolider.save()
    .then(async result => {

       if(Superior[0] != null){
           console.log("1", result,result._id, Superior[1])
        try {
            await armyData.updateOne({ _id: Superior[1] },{$push:{NumberOfDS: result._id}});
            res.json({message: result});
       
          } catch (error) {
            res.status(500).json({message: error.message});
          }
            
        }else {
            return res.json({message:result});
        }
        
       // res.json({message:result})
    })
    .catch(error => {
        res.status(500).json({message:error.message});
    });
       /* res.json({message:'Success!'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }*/

    
});
/*
router.post('/todos', (req, res) => {
        console.log(req.body)
        var user = new User();      
        user.text = req.body.user;  
        user.completed = false;
        console.log(user)
        User.save(  err => {
            if (err) {
                res.status(501).send(err);
            };
            res.status(200).json({ message: 'user created!' });
        });
        
});

// only need to toggle completed field
router.put('/todos/:id', (req, res) => {
    console.log(req.params.id)
    User.findById(req.params.id, (err, user) => {

            if (err) {
                res.send(err);
            }
            user.completed = !user.completed;
            user.save(err =>  {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'user toggled!' });
            });

        });
});
*/
// router.get('/bears/:bear_id', (req, res) => {
//         Bear.findById(req.params.bear_id, (err, bear) => {
//             if (err) {
//                 res.send(err);
//                 return;
//             }
//             res.json(bear);
//         });
//     });



// router.delete('/bears/:bear_id', (req, res) => {
//         Bear.deleteOne({
//             _id: req.params.bear_id
//         }, (err, bear) => {
//             if (err) {
//                 res.send(err);
//             }
//             res.json({ message: 'Successfully deleted' });
//         });
//     });

module.exports = router;


