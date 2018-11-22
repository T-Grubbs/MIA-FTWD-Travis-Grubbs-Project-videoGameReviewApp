const express    = require('express');
const router     = express.Router();


router.get("/test", (req, res, next) => {
  console.log(req.user)
  res.render("test");
});








module.exports = router;