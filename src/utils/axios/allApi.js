export default {
  // 频道：
  addChannel: 'informationApiService/channel/add', //新增频道
  getChannel: 'informationApiService/channel/index', //频道列表（查询）
  delChannel: 'informationApiService/channel/delete', //频道删除
  updateChannel: 'informationApiService/channel/update', //频道更新
  infoChannel: 'informationApiService/channel/info', //频道详情
  // 标签：
  addLabel: 'informationApiService/label/add', //标签添加
  getLabel: 'informationApiService/label/index', //标签获取
  delLabel: 'informationApiService/label/delete', //标签删除
  updateLabel: 'informationApiService/label/update', //标签更新
  infoLabel: 'informationApiService/label/info', //标签详情
  // 相似标签：
  getSimilar: 'informationApiService/label/similarIndex', //相似标签获取
  addSimilar: 'informationApiService/label/similarAdd', //相似标签添加
  delSimilar: 'informationApiService/label/similarDelete', //相似标签删除
  infoSimilar: 'informationApiService/label/similarInfo', //相似标签详情
  updateSimilar: 'informationApiService/label/similarUpdate', //相似标签更新
  // 标签规则：
  getAnalysis: 'informationApiService/label/analysisIndex', //标签规则获取
  addAnalysis: 'informationApiService/label/analysisAdd', //标签规则添加
  infoAnalysis: 'informationApiService/label/analysisInfo', //标签规则详情
  updateAnalysis: 'informationApiService/label/analysisUpdate', //标签规则更新
  delAnalysis: 'informationApiService/label/analysisDelete', //相似标签删除
  // 热搜：
  getHot: 'informationApiService/search/hotIndex', //热搜获取
  addHot: 'informationApiService/search/hotAdd', //热搜添加
  infoHot: 'informationApiService/search/hotInfo', //热搜详情
  updateHot: 'informationApiService/search/hotUpdate', //热搜更新
  delHot: 'informationApiService/search/hotDelete', //热搜删除
  // 用户：
  getUser: 'userApiService/badou/selectBackUserInfo', //用户信息获取
  addUser: 'userApiService/badou/backRegiste', //新增用户
  updateUser: 'userApiService/badou/updateUserInfo', //编辑用户
  infoUser: 'userApiService/badou/selectUserInfo', //用户详情
  searchUser: 'userApiService/badou/selectUserName', //用户搜索
  //签到配置
  getUserConf: "userApiService/badou/userGeneralList", //获取签到配置列表
  addUserConf: "userApiService/badou/addUserGeneral", //新增签到配置
  updateUserConf: "userApiService/badou/updateUserGeneral", //编辑签到配置
  infoUserConf: "userApiService/badou/userGeneralDetail", //签到配置详情
  delUserConf: "userApiService/badou/deleteUserGeneral", //获取签到配置列表
  //签到抽奖
  getPrize: "userApiService/badou/getPrizeList", //抽奖方案获取
  addPrize: "userApiService/badou/addGetPrize", //抽奖方案新增
  updatePrize: "userApiService/badou/updateGetPrize", //抽奖方案新增
  infoPrize: "userApiService/badou/getPrizeDetail", //抽奖方案详情
  // 资讯：
  getNews: 'informationApiService/news/index', //资讯获取
  addNews: 'informationApiService/news/add', //资讯添加
  delNews: 'informationApiService/news/delete', //资讯删除
  updateNews: 'informationApiService/news/update', //资讯更新
  infoNews: 'informationApiService/news/info', //资讯详情
  //直播
  getLive: "informationApiService/match/index", //获取赛程
  addLive: "informationApiService/match/add", //添加赛程
  delLive: "informationApiService/match/delete", //删除赛程
  infoLive: "informationApiService/match/info", //赛程详情
  updateLive: "informationApiService/match/update", //编辑赛程
  // 广告
  getAd: 'systemApiService/advertisement/index', //广告获取
  addAd: 'systemApiService/advertisement/add', //广告添加
  updateAd: 'systemApiService/advertisement/update', //广告更新
  delAd: 'systemApiService/advertisement/delete', //广告删除
  infoAd: 'systemApiService/advertisement/info', //广告详情
  // 资讯广告
  getAdNews: 'systemApiService/advertisementNews/index', //广告获取
  addAdNews: 'systemApiService/advertisementNews/add', //广告添加
  updateAdNews: 'systemApiService/advertisementNews/update', //广告更新
  delAdNews: 'systemApiService/advertisementNews/delete', //广告删除
  infoAdNews: 'systemApiService/advertisementNews/info', //广告详情
  //广告位
  getPosition: 'systemApiService/advertisementPosition/index', //广告位获取
  addPosition: 'systemApiService/advertisementPosition/add', //广告位添加
  updatePosition: 'systemApiService/advertisementPosition/update', //广告位编辑
  delPosition: 'systemApiService/advertisementPosition/delete', //广告位删除
  infoPosition: 'systemApiService/advertisementPosition/info', //广告位详情
  //广告配置
  getDeploy: 'systemApiService/advertisementConf/index', //广告配置获取
  addDeploy: 'systemApiService/advertisementConf/add', //广告配置添加
  updateDeploy: 'systemApiService/advertisementConf/update', //广告配置编辑
  delDeploy: 'systemApiService/advertisementConf/delete', //广告配置删除
  infoDeploy: 'systemApiService/advertisementConf/info', //广告配置详情
  // 活动:
  addActivity: 'informationApiService/channelActivity/add', //活动新增
  getActivity: 'informationApiService/channelActivity/index', //活动获取
  updateActivity: 'informationApiService/channelActivity/update', //活动更新
  delActivity: 'informationApiService/channelActivity/delete', //活动更新
  infoActivity: 'informationApiService/channelActivity/info', //活动详情
  // 社群:
  addGroup: "communityApiService/association/createAssociation", //社群新增
  getGroup: "communityApiService/association/backAssociationList", //社群获取
  updateGroup: "communityApiService/association/updateAssociation", //社群编辑
  delGroup: "communityApiService/association/deleteAssociation", //社群删除
  infoGroup: "communityApiService/association/associationDetail", //社群详情
  searchGroup: "communityApiService/association/search", //社群搜索

  // 社群分类:
  getClassify: "communityApiService/association/classifyList", //社群分类获取
  addClassify: "communityApiService/association/addClassify", //社群分类新增
  updateClassify: "communityApiService/association/updateClassify", //社群分类更新
  delClassify: "communityApiService/association/deleteClassify", //社群分类/标签删除
  infoClassify: "communityApiService/association/classifyDetail", //社群分类详情
  // 社群标签:
  addLabelList: "communityApiService/association/addClassifyLabel", //社群标签新增
  getLabelList: "communityApiService/association/backClassifyLabelList", //社群标签获取
  updateLabelList: "communityApiService/association/updateClassifyLabel", //社群标签编辑
  infoLabelList: "communityApiService/association/classifyLabelDetail", //社群标签详情
  // 关联:
  getRelative: " communityApiService/association/classifyLabelList", //关联关系获取
  addRelative: "communityApiService/association/classifyLabelRelation", //关联关系新增
  getRelativeLabel: "communityApiService/association/classifyLabelList", //关联关系标签获取
  //帖子问答
  addInvitation: "communityApiService/community/createInvitation", //帖子新增
  delInvitation: "communityApiService/community/deleteInvitation", //帖子删除
  getInvitation: "communityApiService/association/backPostList", //帖子列表
  updateInvitation: "communityApiService/community/updateInvitation", //帖子编辑
  infoInvitation: "communityApiService/community/invitationDetail", //帖子详情
  // 游戏：
  getGame: "gameApiService/game/index", //游戏列表
  addGame: "gameApiService/game/add", //游戏添加
  updateGame: "gameApiService/game/update", //游戏更新
  delGame: "gameApiService/game/delete", //游戏删除
  infoGame: "gameApiService/game/info", //游戏详情
  //题目:
  getTopic: "gameApiService/questionSubject/index", //获取题目
  addTopic: "gameApiService/questionSubject/add", //添加题目
  updateTopic: "gameApiService/questionSubject/update", //编辑题目
  delTopic: "gameApiService/questionSubject/delete", //删除题目
  infoTopic: "gameApiService/questionSubject/info", //题目详情
  // 题库
  getBank: "gameApiService/question/index", //获取题库
  delBank: "gameApiService/question/delete", //题库删除
  updateBank: "gameApiService/question/update", //题库更新
  addBank: "gameApiService/question/add", //题库新增
  infoBank: "gameApiService/question/info", //题库详情
  subjectList: "gameApiService/question/subjectIndex", //题库题列表
  delSubject: "gameApiService/question/subjectDelete", //题库题删除
  addSubject: "gameApiService/question/subjectAdd", //题库题新增
  //游戏配置
  getConfig: "gameApiService/gameConfig/index", //获取配置
  addConfig: "gameApiService/gameConfig/add", //新增配置
  delConfig: "gameApiService/gameConfig/delete", //删除配置
  updateConfig: "gameApiService/gameConfig/index", //编辑配置
  infoConfig: "gameApiService/gameConfig/info", //配置详情
  //游戏攻略
  getStrategy: "gameApiService/gameStrategy/index", //获取攻略
  addStrategy: "gameApiService/gameStrategy/add", //添加攻略
  updateStrategy: "gameApiService/gameStrategy/update", //更新攻略
  delStrategy: "gameApiService/gameStrategy/delete", //删除攻略
  infoStrategy: "gameApiService/gameStrategy/info", //攻略详情
  //赛事
  getMatch: "gameApiService/match/index", //获取赛事
  addMatch: "gameApiService/match/add", //添加赛事
  updateMatch: "gameApiService/match/update", //编辑赛事
  delMatch: "gameApiService/match/delete", //删除赛事
  infoMatch: "gameApiService/match/info", //赛事详情
  //赛事奖励
  getAward: "gameApiService/matchReward/index", //获取奖励
  addAward: "gameApiService/matchReward/add", //添加奖励
  updateAward: "gameApiService/matchReward/update", //编辑奖励
  delAward: "gameApiService/matchReward/delete", //删除奖励
  infoAward: "gameApiService/matchReward/info", //奖励详情
  // 文件：
  upload: 'systemApiService/upload/image', //文件上传
  //竞猜
  addGuess: "communityApiService/activity/addGuessActivity", //添加竞猜
  delGuess: "communityApiService/activity/deleteActivity", //删除竞猜
  updateGuess: "communityApiService/activity/updateGuessActivity", //编辑竞猜
  infoGuess: "communityApiService/activity/activityDetail", //竞猜详情
  getGuess: "communityApiService/activity/activityList", //获取竞猜
  accountGuess: "communityApiService/activity/guessBalance", //结算竞猜
  //消息模板
  addTemplate: "systemApiService/msgTpl/add", //新增模板
  delTemplate: "systemApiService/msgTpl/delete", //删除模板
  updateTemplate: "systemApiService/msgTpl/update", //编辑模板
  infoTemplate: "systemApiService/msgTpl/info", //模板详情
  getTemplate: "systemApiService/msgTpl/index", //获取模板
  //消息
  addMessage: "systemApiService/msg/add", //新增消息
  delMessage: "systemApiService/msg/delete", //删除消息
  updateMessage: "systemApiService/msg/update", //编辑消息
  infoMessage: "systemApiService/msg/update", //消息详情
  getMessage: "systemApiService/msg/update", //获取消息
  // 商品
  getProduct: "App/score/shop" //获取实物列表
}
