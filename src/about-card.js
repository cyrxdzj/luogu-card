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
async function fetchStats(id) {
  //debug 测试请求
  const res = await axios.get(`https://tc-0glpuj1k4e75e5ec-1300876583.ap-shanghai.service.tcloudbase.com/luogu?id=${id}`);

  //const res = await axios.get(`https://www.luogu.com.cn/user/${id}?_contentOnly`)

  const stats = {
    name: "NULL",
    color: "Gray",
    ccfLevel: 0,
    slogan: "",
    followerCount: 0,
    followingCount:0
  }
  if(res.data.code !== 200) {
    return stats;
  }
  const user = res.data.currentData.user;
  
  stats.name = user.name;
  stats.color = user.color;
  stats.ccfLevel = user.ccfLevel;
  stats.slogan = user.slogan;
  stats.followerCount = user.followerCount;
  stats.followingCount = user.followingCount;
  
  return stats;
}

const renderSVG = (stats, options) => {
  const {
    name,
    color,
    ccfLevel,
    slogan,
    followerCount,
    followingCount
  } = stats;
  
  const { 
    hideTitle, 
    darkMode,
    cardWidth = 500, 
  } = options || {};
  
  const title = renderNameTitle(name, color, ccfLevel, "的基本信息", cardWidth);
