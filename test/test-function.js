const {
  renderNameTitle,
  renderAboutText,
} = require("../src/common.js");
module.exports = async (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  if(req.query.function=="rat")
  {
    return res.send("<svg>"+renderAboutText(req.query.followerCount,req.query.followingCount,req.query.slogan)+"</svg>");
  }
  else if(req.query.function=="rnt")
  {
    return res.send("<svg>"+renderNameTitle(req.query.name,req.query.color,parseInt(req.query.ccfLevel),req.query.title,parseInt(req.query.cardWidth),req.query.rightTop)+"</svg>");
  }
  else
  {
    return res.send("<svg>"+renderAboutText(3,3,"Hello World!")+"</svg>");
  }
}
