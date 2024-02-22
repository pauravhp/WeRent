const express = require('express');
const router = express.Router();


//sample data
const RANDOM = [
   //listing 1
    {
    id: 'c1',
    place: '3987 gordon head',
    description: 'close to University',
    distance: '10 min'
},
{
    //listing 2
    id: 'c2',
    place: 'chevron gas status',
    description: 'close to University',
    distance: '2 min'

}]
//enter http://localhost:2345/api/rating for the below api
router.get('/rating', (req, res, next) =>{
res.send("choose your preferences")
});

// enter http://localhost:2345/api/[listing_id_number] for the api below
// http://localhost:2345/api/c1
router.get('/:pid', (req, res, next) =>{
    const placeid = req.params.pid; 
    const place = RANDOM.find(p =>{
            return p.id === placeid;
    });
    res.json(place);
    });

module.exports = router;

