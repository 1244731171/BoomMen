先天(基因) - inborn
    static 
        ID  
        性别(xx,xy)
        智商[0,200]
    dynamic
        寿命上限(后期 +后天影响)
        是非值[-100,100]
后天(性格|属性)
    dynamic
        自私-selfish:自身收益必做,自身不收益不做;自身收益降压，自身损失增压
        无私-selfless:他人收益必做;他人收益增加
        罪恶-evil:自身收益可能不做,自身不损失他人损失必做;他人损失降压，他人收益增压
        病态-insane:他人损失必做,不考虑自身;他人损失降压
状态 
    static 
        抗压属性 n*增加压力值[0,2]
        减压属性 n*释放压力值[0,2]
        学习能力系数(智商)
    dynamic
        寿命[0, 寿命上限]
        体力值[0,100]
        压力[0,100]
        金钱[0,Infinity]
行为
    补充能量
    回压力(休息小回,娱乐大回)
    工作

let personCodeDes = {
    dna:{
        name:`基因`
        des:`可遗传，决定下一代`
        data:{
            static:{
                id:{
                    name:`UID`,
                    des:``,
                    valueDes: `new Date().getTime()`,
                    type: `number`
                },
                sex:{
                    name:`性别`,
                    des:`父母双方split后random组合`,
                    valueDes: `('xx', 'xy')`,
                    type: `string`
                },
                iq:{
                    name:`性别`,
                    des:`父母双方split后random组合`,
                    valueDes: `[0, 200]`,
                    type: `number`
                },
                maxHp:{
                    name:`生命值`,
                    des:`max永远100`,
                    valueDes: `[0, 100]`,
                    type: `number`
                }
            },
            dynamic:{
                maxAge:{
                    name:`最大年龄`,
                    des:`受父母maxAge+后天决定`,
                    valueDes: `[0, 200]`,
                    type: `number`
                },
                justice :{
                    name:`正义值`,
                    des:`受父母justice+后天决定`,
                    valueDes: `[-100, 100]`,
                    type: `number`
                }
            }
        }
    },
    attr:{
        name: `性格属性`,
        des: `不同属性有不同效果，主要有dna决定`,
        valueDes: `[]`,
        data:{
            static:{
                selfish:{
                    name: `自私`,
                    des: `自身收益必做,自身不收益不做;自身收益降压，自身损失增压`,
                    value: `selfish`
                },
                selfless:{
                    name: `无私`,
                    des: `他人收益必做;他人收益增加`,
                    value: `selfless`
                },
                evil:{
                    name: `罪恶`,
                    des: `自身收益可能不做,自身不损失他人损失必做;他人损失降压，他人收益增压`,
                    value: `selfless`
                },
                insane:{
                    name: `病态`,
                    des: `他人损失必做,不考虑自身;他人损失降压`,
                    value: `selfless`
                }
            }
        }
    },
    status:{
        name: `状态属性`,
        des: `不同属性有不同效果，主要有dna决定`,
        valueDes: `[]`,
        data:{
            static: {
                pressurizeAbility:{
                    name:`抗压系数`,
                    des:`系数越大，越能抗压，单次增压值越低`,
                    valueDes: `[0, 2]`,
                    type: `number`
                },
                decompressAbility:{
                    name:`减压系数`,
                    des:`系数越大，释放压力效果越好，单次降压值约高`,
                    valueDes: `[0, 2]`,
                    type: `number`
                },
                learnAbility:{
                    name:`学习能力系数`,
                    des:`系数越大，学习到的技能点越高`,
                    valueDes: `[0, 2]`,
                    type: `number`
                }
            },
            dynamic:{
                age:{
                    name:`年龄`,
                    des:``,
                    valueDes: `[0, maxAge]`,
                    type: `number`
                },
                energy:{
                    name:`体力 能量`,
                    des:``,
                    valueDes: `[0, 100]`,
                    type: `number`
                },
                hp:{
                    name:`健康值`,
                    des:``,
                    valueDes: `[0, maxHp]`,
                    type: `number`
                }
            }
        }
    }
}