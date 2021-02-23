const axios = require("axios");
const {
  Card,
  renderError,
  renderChart,
  renderNameTitle,
} = require("./common.js");

/**
 * 
 * @param {number} id 用户id
 * @returns {Object} 获取的用户数据 {name, color, ccfLevel, slogan, followerCount, followingCount}
 */
async function fetchAbout(id) {
  //debug 测试请求
  const res = await axios.get(`https://tc-0glpuj1k4e75e5ec-1300876583.ap-shanghai.service.tcloudbase.com/luogu?id=${id}`);

  //const res = await axios.get(`https://www.luogu.com.cn/user/${id}?_contentOnly`)

  const about = {
    name: "NULL",
    color: "Gray",
    ccfLevel: 0,
    slogan: "",
    followerCount: 0,
    followingCount:0
  }
  if(res.data.code !== 200) {
    return about;
  }
  const user = res.data.currentData.user;
  
  about.name = user.name;
  about.color = user.color;
  about.ccfLevel = user.ccfLevel;
  about.slogan = user.slogan;
  about.followerCount = user.followerCount;
  about.followingCount = user.followingCount;
  
  return about;
}

const renderSVG = (about, options) => {
  const {
    name,
    color,
    ccfLevel,
    slogan,
    followerCount,
    followingCount
  } = about;
  
  const { 
    hideTitle, 
    darkMode,
    cardWidth = 500, 
  } = options || {};
  
  const paddingX = 25;
  const body = renderAboutText(about.followingCount,about.followerCount,about.slogan);
  const title = renderNameTitle(name, color, ccfLevel, "的基本信息", cardWidth, "");
  
  return new Card({
    width: cardWidth - 2*paddingX,
    height: 200 + 10,
    hideTitle,
    darkMode,
    title,
    body,
  }).render();
}

module.exports = { fetchAbout, renderSVG }
