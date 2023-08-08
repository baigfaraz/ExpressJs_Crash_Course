const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');



//Create route for get all members
router.get('/' , (req , res)=>{
    res.json(members);
});

//Create route for get searching id 
router.get('/id/:id' , (req , res)=>{
    res.send(req.params.id);
});

//Create route for get Single member through id 
router.get('/:id' , (req , res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if(found)
    {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else
    {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});
//Create route for get Single member through name 
router.get('/name/:name', (req, res) => {
    const { name } = req.params;
    const foundMember = members.find(member => member.name === name);
  
    if (foundMember) {
      res.json(foundMember);
    } else {
      res.status(400).json({ msg: `No member with the name ${name}` });
    }
  });
//Create route for get all member through name 
router.get('/all/name/:name', (req, res) => {
    const { name } = req.params;
    const foundMembers = members.filter(member => member.name === name);
  
    if (foundMembers.length > 0) {
      res.json(foundMembers);
    } else {
      res.status(400).json({ msg: `No members with the name ${name}` });
    }
  });


//create a member
router.post('/' , (req , res)=>{
    const newMember = {
        id : uuid.v4(),
        name : req.body.name,
        age : req.body.age
    }
    if(!newMember.name || !newMember.age)
    {
        return res.status(400).json({msg : 'Information is incomplete.'});
    }

    members.push(newMember);
    res.json({msg : 'Successfully new member added in database.'});
});

// update member
router.put('/:id' , (req , res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found)
    {
        const updateMember = req.body;
        members.forEach(member=>{
            if(member.id === parseInt(req.params.id))
            {
                member.name = updateMember.name ? updateMember.name : member.name,
                member.age = updateMember.age ? updateMember.age : member.age
                res.json({msg: 'Member updated', member});
            }
        });
    }
    else
    {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

// delete member
router.delete('/:id' , (req , res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found)
    {
        res.json({ msg : 'Member deleted' , members: members.filter(member => member.id !== parseInt(req.params.id))});
    }
    else
    {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

module.exports = router;