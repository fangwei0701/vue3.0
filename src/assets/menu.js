export const menus = [
  {
    "name": "Dashboard",
    "icon": "layer-group",
    "url": "/dashboard",
    "permission": {
      "permission": [],
      "mode": "oneOf"
    }
  },
  {
    "name": "分析中心",
    "icon": "chart-pie-alt",
    "url": "/analysis-center",
    "children": [
      {
        "name": "余额波动",
        "url": "/analysis-center/balance-fluctuation",
        "permission": {
          "permission": [],
          "mode": "oneOf"
        }
      },
      {
        "name": "收支结构",
        "url": "/analysis-center/pr-structure",
        "permission": {
          "permission": [],
          "mode": "oneOf"
        },
        "children": [
          {
            "name": "收支结构详情",
            "url": "/analysis-center/pr-structure-detail"
          }
        ]
      },
      {
        "name": "对手方分析",
        "url": "/analysis-center/counterParty-analysis",
        "permission": {
          "permission": [],
          "mode": "oneOf"
        }
      }
    ]
  },
  {
    "name": "风险预警",
    "icon": "brake-warning",
    "url": "/risk-warning",
    "permission": {
      "permission": [],
      "mode": "oneOf"
    },
    "children": [
      {
        "name": "余额波动",
        "url": "/analysis-center/balance-fluctuation",
        "permission": {
          "permission": [],
          "mode": "oneOf"
        }
      },
      {
        "name": "收支结构",
        "url": "/analysis-center/pr-structure",
        "permission": {
          "permission": [],
          "mode": "oneOf"
        },
        "children": [
          {
            "name": "收支结构详情",
            "url": "/analysis-center/pr-structure-detail"
          }
        ]
      },
      {
        "name": "对手方分析",
        "url": "/analysis-center/counterParty-analysis",
        "permission": {
          "permission": [],
          "mode": "oneOf"
        }
      }
    ]
  },
  {
    "name": "对外支付",
    "icon": "sack-dollar",
    "url": "/payment",
    "children": [
      {
        "name": "付款申请",
        "url": "/payment/apply",
        "permission": { "permission": [] }
      },
      {
        "name": "付款复核",
        "url": "/payment/review",
        "permission": {
          "permission": [],
          "mode": "oneOf"
        }
      },
      {
        "name": "付款释放",
        "url": "/payment/release",
        "permission": {
          "permission": []
        }
      },
      {
        "name": "付款记录查询",
        "url": "/payment/record",
        "permission": {
          "permission": []
        }
      },
      {
        "name": "账户余额查询",
        "url": "/payment/account",
        "permission": {
          "permission": []
        }
      },
      {
        "name": "付款设置",
        "url": "/payment/set",
        "permission": {
          "permission": []
        }
      }
    ]
  }
]
