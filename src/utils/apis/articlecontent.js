export const titleTypes = {
    0: "图文",
    1: "阅读",
    2: "连载",
    3: "问答",
    4: "音乐",
    5: "影视",
    8: "电台",
    11: "专题"
}


export const categoryNames = {
    0: "hp",//图文
    1: "essay",//阅读
    2: "serialcontent",//连载
    3: "question",//问答
    4: "music",//音乐
    5: "movie",//影视
    // 6: "连载",//连载
    8: "radio",//电台
    // 9: "歌单",//歌单
    11: "topic"//专题
}

export const getHpDetail = ({axios,date}) => {
    // axios本身就是一个promise
    return axios.get('https://apis.netstart.cn/one/hp/bydate/' + date)

}

export const getDiscover = ({axios, category, month}) => {

    return axios.get(`https://apis.netstart.cn/one/find/bymonth/${category}/${month}`)
}

// 文章详情API
export const getArticleDetail = ({axios, id, category}) => {
    let categoryName = categoryNames[category]

    if (!categoryName) {
        console.error('未知的分类类型')
        return
    }

    return axios.get(`https://apis.netstart.cn/one/${categoryName}/htmlcontent/${id}`)
}