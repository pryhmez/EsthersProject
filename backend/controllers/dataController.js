const { searchAndFindUsers, getUserProfile, recievedRequests } = require("../services/dataServices");

module.exports = function dataController() {
  
  let count = 0;
  let totalLevel = 0;
  let avgLevel = 0;
  //searches and finds a user
  this.send = (req, res, next) => {
    
    console.log(req.query.data);
    let Level = req.query.data;
    let newLevel = parseFloat(Level);

    
    if (count <= 2) {
      totalLevel = totalLevel + newLevel;
      avgLevel = (totalLevel)/(count + 1);
      console.log(newLevel, totalLevel, avgLevel, count);
      count++;
    } else {
      global.io.sockets.emit(
        "data", 
        {
          level: parseFloat(avgLevel) + "",
          avgConsumption: '200',
          totalSpent: parseInt(avgLevel) * 168,
          longitude: req.query.longi,
          latitude: req.query.lati
        }
        );
      count = 0;
      totalLevel = 0;
      //
    }


    res.send({
      success: true
    })
    
    // send(req.query).then(result => {

    //   res.send({
    //     success: true,
    //     entry: req.body,
    //     data: result
    //   })
    // }).catch(err => {
    //   res.send({
    //     success: false,
    //     data: err
    //   })
    // })

  }


  //get the users profie details and then returns the value
  this.getUserProfile = (req, res, next) => {

    getUserProfile(req.body).then(result => {
      res.send({
        success: true,
        entry: req.body,
        data: result
      })
    }).catch(err => {
      res.send({
        success: false,
        data: err
      })
    })
  }



};
