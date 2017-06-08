//Helper module for returning generic json response for both success & error
//BASE SETUP
//===========================

module.exports = (res) => {

  return {

    callback: (result) => res.json({success: true, result: result}),
    error: (error) => res.json({success: false, message: 'Technical error - please contact developer or try again later.'})
  }

}
