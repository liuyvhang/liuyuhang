import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout/index'
import login from '@/views/login/login' //登录

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/404',
      component: () => import('@/views/404'),
      hidden: true
    },
    {
      path: '/',
      name: '主页',
      redirect: '/home',
      component: layout,
      children: [{
          path: '/home',
          name: '首页',
          component: () =>
            import('@/views/home')
        },
        {
          path: '/news',
          name: '资讯模块',
          redirect: '/news/news',
          component: () =>
            import('@/views/news'),
          children: [{
              path: "/news/news",
              name: "资讯",
              component: () =>
                import('@/views/news/news'),
            }, {
              path: "/news/news/add",
              name: "新增资讯",
              component: () =>
                import('@/views/news/news/add'),
            },
            {
              path: "/news/news/edit",
              name: "编辑资讯",
              component: () =>
                import('@/views/news/news/add'),
            },
            {
              path: "/news/flash",
              name: "快讯",
              component: () =>
                import('@/views/news/flash'),
            },
            {
              path: "/news/flash/add",
              name: "添加快讯",
              component: () =>
                import('@/views/news/flash/add'),
            }, {
              path: "/news/flash/edit",
              name: "编辑快讯",
              component: () =>
                import('@/views/news/flash/add'),
            },
            {
              path: "/news/banner",
              name: "轮播图",
              component: () =>
                import('@/views/news/banner'),
            }, {
              path: "/news/banner/add",
              name: "新增轮播图",
              component: () =>
                import('@/views/news/banner/add'),
            }, {
              path: "/news/banner/edit",
              name: "编辑轮播图",
              component: () =>
                import('@/views/news/banner/add'),
            }, {
              path: "/news/banner/create",
              name: "生成轮播图",
              component: () =>
                import('@/views/news/banner/add'),
            }, {
              path: "/news/ad",
              name: "广告",
              component: () =>
                import('@/views/news/ad'),
            }, {
              path: "/news/ad/add",
              name: "添加广告",
              component: () =>
                import('@/views/news/ad/add'),
            }, {
              path: "/news/ad/edit",
              name: "编辑广告",
              component: () =>
                import('@/views/news/ad/add'),
            }, {
              path: "/news/position",
              name: "广告位置",
              component: () =>
                import('@/views/news/ad/position'),
            }, {
              path: "/news/position/add",
              name: "添加广告位",
              component: () =>
                import('@/views/news/ad/position/add'),
            }, {
              path: "/news/position/edit",
              name: "编辑广告位",
              component: () =>
                import('@/views/news/ad/position/add'),
            }, {
              path: "/news/config",
              name: "广告配置",
              component: () =>
                import('@/views/news/ad/config'),
            }, {
              path: "/news/config/add",
              name: "添加广告配置",
              component: () =>
                import('@/views/news/ad/config/add'),
            }, {
              path: "/news/config/edit",
              name: "编辑广告配置",
              component: () =>
                import('@/views/news/ad/config/add'),
            }, {
              path: "/news/adNews",
              name: "资讯广告",
              component: () =>
                import('@/views/news/ad/adNews'),
            }, {
              path: "/news/adNews/add",
              name: "添加资讯广告",
              component: () =>
                import('@/views/news/ad/adNews/add'),
            }, {
              path: "/news/adNews/edit",
              name: "编辑资讯广告",
              component: () =>
                import('@/views/news/ad/adNews/add'),
            },
            {
              path: '/news/activity',
              name: "资讯活动",
              component: () =>
                import('@/views/news/activity')
            },
            {
              path: '/news/activity/add',
              name: "添加资讯活动",
              component: () =>
                import('@/views/news/activity/add')
            },
            {
              path: '/news/activity/edit',
              name: "编辑资讯活动",
              component: () =>
                import('@/views/news/activity/add')
            },
            {
              path: "/news/source",
              name: "源管理",
              component: () =>
                import('@/views/news/source'),
            },
            {
              path: "/news/video",
              name: "视频管理",
              component: () =>
                import('@/views/news/video'),
            },
            {
              path: "/news/video/add",
              name: "新增视频",
              component: () =>
                import('@/views/news/video/add'),
            },
            {
              path: "/news/video/edit",
              name: "编辑视频",
              component: () =>
                import('@/views/news/video/add'),
            },
          ]
        }, {
          path: '/video',
          name: '赛事直播',
          redirect: '/video/video',
          component: () =>
            import('@/views/video'),
          children: [{
              path: "/video/video",
              name: "赛事直播管理",
              component: () =>
                import('@/views/video/video'),
            },
            {
              path: "/video/video/add",
              name: "新增赛事直播",
              component: () =>
                import('@/views/video/video/add'),
            },
            {
              path: "/video/video/edit",
              name: "编辑赛事直播",
              component: () =>
                import('@/views/video/video/add'),
            },
          ]
        },
        {
          path: '/group',
          name: '社群模块',
          redirect: '/group/group',
          component: () =>
            import('@/views/group'),
          children: [{
              path: "/group/group",
              name: "社群",
              component: () =>
                import('@/views/group/group'),
            },
            {
              path: "/group/group/add",
              name: "添加社群",
              component: () =>
                import('@/views/group/group/add'),
            },
            {
              path: "/group/group/edit",
              name: "编辑社群",
              component: () =>
                import('@/views/group/group/add'),
            },
            {
              path: "/group/invitation",
              name: "帖子",
              component: () =>
                import('@/views/group/invitation'),
            },
            {
              path: "/group/invitation/add",
              name: "添加帖子",
              component: () =>
                import('@/views/group/invitation/add'),
            },
            {
              path: "/group/invitation/edit",
              name: "编辑帖子",
              component: () =>
                import('@/views/group/invitation/add'),
            },
            {
              path: "/group/question",
              name: "问答",
              component: () =>
                import('@/views/group/question'),
            },
            {
              path: "/group/question/add",
              name: "添加问答",
              component: () =>
                import('@/views/group/question/add'),
            },
            {
              path: "/group/question/edit",
              name: "编辑问答",
              component: () =>
                import('@/views/group/question/add'),
            },
            {
              path: "/group/guess",
              name: "竞猜管理",
              component: () =>
                import('@/views/group/guess'),
            },
            {
              path: "/group/guess/add",
              name: "添加竞猜",
              component: () =>
                import('@/views/group/guess/add'),
            },
            {
              path: "/group/guess/edit",
              name: "编辑竞猜",
              component: () =>
                import('@/views/group/guess/add'),
            },
            {
              path: "/group/product",
              name: "夺宝管理",
              component: () =>
                import('@/views/group/product'),
            },
            {
              path: "/group/product/add",
              name: "添加夺宝",
              component: () =>
                import('@/views/group/product/add'),
            },
            {
              path: "/group/product/edit",
              name: "编辑夺宝",
              component: () =>
                import('@/views/group/product/add'),
            },
            {
              path: "/group/classify",
              name: "社群分类",
              component: () =>
                import('@/views/group/classify'),
            },
            {
              path: "/group/classify/add",
              name: "添加社群分类",
              component: () =>
                import('@/views/group/classify/add'),
            },
            {
              path: "/group/classify/edit",
              name: "编辑社群分类",
              component: () =>
                import('@/views/group/classify/add'),
            },
            {
              path: "/group/label",
              name: "社群标签",
              component: () =>
                import('@/views/group/label'),
            },
            {
              path: "/group/label/add",
              name: "添加社群标签",
              component: () =>
                import('@/views/group/label/add'),
            },
            {
              path: "/group/label/edit",
              name: "编辑社群标签",
              component: () =>
                import('@/views/group/label/add'),
            },
            {
              path: "/group/relative",
              name: "关联管理",
              component: () =>
                import('@/views/group/relative'),
            },
          ]
        },
        {
          path: '/game',
          name: '游戏',
          redirect: "/game/game",
          component: () =>
            import('@/views/game'),
          children: [{
            path: "/game/game",
            name: "游戏管理",
            component: () =>
              import('@/views/game/game'),
          }, {
            path: "/game/game/add",
            name: "添加游戏",
            component: () =>
              import('@/views/game/game/add'),
          }, {
            path: "/game/game/edit",
            name: "编辑游戏",
            component: () =>
              import('@/views/game/game/add'),
          }, {
            path: "/game/strategy",
            name: "游戏攻略",
            component: () =>
              import('@/views/game/strategy'),
          }, {
            path: "/game/strategy/add",
            name: "添加攻略",
            component: () =>
              import('@/views/game/strategy/add'),
          }, {
            path: "/game/strategy/edit",
            name: "编辑攻略",
            component: () =>
              import('@/views/game/strategy/add'),
          }, {
            path: "/game/config",
            name: "游戏配置",
            component: () =>
              import('@/views/game/config'),
          }, {
            path: "/game/config/add",
            name: "添加配置",
            component: () =>
              import('@/views/game/config/add'),
          }, {
            path: "/game/config/edit",
            name: "编辑配置",
            component: () =>
              import('@/views/game/config/add'),
          }, {
            path: "/game/bank",
            name: "题库",
            component: () =>
              import('@/views/game/bank'),
          }, {
            path: "/game/bank/add",
            name: "添加题库",
            component: () =>
              import('@/views/game/bank/add'),
          }, {
            path: "/game/bank/edit",
            name: "编辑题库",
            component: () =>
              import('@/views/game/bank/add'),
          }, {
            path: "/game/topic",
            name: "题目管理",
            component: () =>
              import('@/views/game/topic'),
          }, {
            path: "/game/topic/add",
            name: "添加题目",
            component: () =>
              import('@/views/game/topic/add'),
          }, {
            path: "/game/topic/edit",
            name: "编辑题目",
            component: () =>
              import('@/views/game/topic/add'),
          }, {
            path: "/game/match",
            name: "赛事管理",
            component: () =>
              import('@/views/game/match'),
          }, {
            path: "/game/match/add",
            name: "添加赛事",
            component: () =>
              import('@/views/game/match/add'),
          }, {
            path: "/game/match/edit",
            name: "编辑赛事",
            component: () =>
              import('@/views/game/match/add'),
          }, {
            path: "/game/award",
            name: "赛事奖励管理",
            component: () =>
              import('@/views/game/award'),
          }, {
            path: "/game/award/add",
            name: "添加赛事奖励",
            component: () =>
              import('@/views/game/award/add'),
          }, {
            path: "/game/award/edit",
            name: "编辑赛事奖励",
            component: () =>
              import('@/views/game/award/add'),
          }, ]
        },
        {
          path: '/user',
          name: '用户',
          redirect: '/user/all',
          component: () =>
            import('@/views/user'),
          children: [{
              path: '/user/all',
              name: "全部用户",
              component: () =>
                import('@/views/user/all'),
            },
            {
              path: '/user/all/add',
              name: "添加用户",
              component: () =>
                import('@/views/user/all/add'),
            },
            {
              path: '/user/all/edit',
              name: "编辑用户",
              component: () =>
                import('@/views/user/all/add'),
            },
            {
              path: '/user/signIn',
              name: "签到管理",
              component: () =>
                import('@/views/user/signIn'),
            },
            {
              path: '/user/signIn/add',
              name: "添加签到",
              component: () =>
                import('@/views/user/signIn/add'),
            },
            {
              path: '/user/signIn/edit',
              name: "编辑签到",
              component: () =>
                import('@/views/user/signIn/add'),
            },
            {
              path: '/user/config',
              name: "通用配置",
              component: () =>
                import('@/views/user/config'),
            },
            {
              path: '/user/config/add',
              name: "添加通用配置",
              component: () =>
                import('@/views/user/config/add'),
            },
            {
              path: '/user/config/edit',
              name: "编辑通用配置",
              component: () =>
                import('@/views/user/config/add'),
            },
            {
              path: '/user/invitation',
              name: "邀请管理",
              component: () =>
                import('@/views/user/invitation'),
            },
            {
              path: '/user/invitation/add',
              name: "添加邀请活动",
              component: () =>
                import('@/views/user/invitation/add'),
            },
            {
              path: '/user/invitation/edit',
              name: "编辑邀请活动",
              component: () =>
                import('@/views/user/invitation/add'),
            },
            {
              path: '/user/invitation/info',
              name: "邀请详情",
              component: () =>
                import('@/views/user/invitation/info'),
            },
            {
              path: '/user/withdraw',
              name: "提现管理",
              component: () =>
                import('@/views/user/withdraw'),
            },
            {
              path: '/user/lottery',
              name: "抽奖管理",
              component: () =>
                import('@/views/user/lottery'),
            },
            {
              path: '/user/lottery/add',
              name: "新增抽奖",
              component: () =>
                import('@/views/user/lottery/add'),
            },
            {
              path: '/user/lottery/edit',
              name: "编辑抽奖",
              component: () =>
                import('@/views/user/lottery/add'),
            },
          ]
        },
        {
          path: '/tags',
          name: '标签',
          redirect: '/tags/all',
          component: () =>
            import('@/views/tags'),
          children: [{
              path: '/tags/all',
              name: "全部标签",
              component: () =>
                import('@/views/tags/all'),
            },
            {
              path: "/tags/all/add",
              name: "添加标签",
              component: () =>
                import('@/views/tags/all/add')
            },
            {
              path: "/tags/all/edit",
              name: "编辑标签",
              component: () =>
                import('@/views/tags/all/add')
            },
            {
              path: '/tags/channel',
              name: "频道管理",
              component: () =>
                import('@/views/tags/channel')
            },
            {
              path: '/tags/channel/add',
              name: "添加频道",
              component: () =>
                import('@/views/tags/channel/add')
            },
            {
              path: '/tags/channel/edit',
              name: "编辑频道",
              component: () =>
                import('@/views/tags/channel/add')
            },
            {
              path: '/tags/project',
              name: "标签管理",
              component: () =>
                import('@/views/tags/project')
            },
            {
              path: '/tags/hot',
              name: "热搜管理",
              component: () =>
                import('@/views/tags/hot')
            },
            {
              path: '/tags/hot/add',
              name: "添加热搜",
              component: () =>
                import('@/views/tags/hot/add')
            },
            {
              path: '/tags/hot/edit',
              name: "编辑热搜",
              component: () =>
                import('@/views/tags/hot/add')
            },
          ]
        },
        {
          path: '/score',
          name: '积分',
          component: () =>
            import('@/views/score')
        },
        {
          path: '/message',
          name: '消息',
          redirect: '/message/message',
          component: () =>
            import('@/views/message'),
          children: [{
              path: '/message/message',
              name: "消息管理",
              component: () =>
                import('@/views/message/message'),
            },
            {
              path: '/message/message/add',
              name: "新增消息",
              component: () =>
                import('@/views/message/message/add'),
            },
            {
              path: '/message/message/edit',
              name: "编辑消息",
              component: () =>
                import('@/views/message/message/add'),
            },
            {
              path: '/message/template',
              name: "模板管理",
              component: () =>
                import('@/views/message/template'),
            },
            {
              path: '/message/template/add',
              name: "新增模板",
              component: () =>
                import('@/views/message/template/add'),
            },
            {
              path: '/message/template/edit',
              name: "编辑模板",
              component: () =>
                import('@/views/message/template/add'),
            },
          ]
        },
      ]
    },
    {
      path: '/login',
      name: '登录页',
      component: login
    },

    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ]
})
