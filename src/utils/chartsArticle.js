export default function transChartsDate (articles){
    let categorys ={
        name:[],
        value:[]
    };
    let pags = []
    let yearArticle = {
        time:[],
        value: []
    };
    //生成最近七个月的日期
    let day2 = new Date();
    day2.setTime(day2.getTime());
    let localTime; // 当前的时间
    if (day2.getMonth()+1 < 10){
        localTime = day2.getFullYear()+"-" + '0' +(day2.getMonth()+1)
    }else {
        localTime = day2.getFullYear()+"-" + (day2.getMonth()+1)
    }
    yearArticle.time.push(localTime)
    yearArticle.value.push(0)
    for (let i =1;i<7;i++){
        yearArticle.value.push(0)
        yearArticle.time.push(fromLastTime(-i))
    }
    for (let article in articles ){
        pags.push({
            name:articles[article].pag,
            value: 0
        });
        categorys.value.push(0)
        categorys.name.push(articles[article].categorize)
    }

    // 去重
    categorys.name = Array.from(new Set(categorys.name))
    pags = unique(pags)

    // category
    for (let category in categorys.name ){
        for (let article  in articles ){
            if (articles[article].categorize == categorys.name[category] ){
                categorys.value[category] += 1;
            }
        }
    }
    // pag
    for (let pag in pags ){
        for (let article  in articles ){
            if (articles[article].pag == pags[pag].name ){
                pags[pag].value += 1;
            }
        }
    }
    // time
    for (let time in yearArticle.time ){
        for (let article  in articles ){
            if (compareTime(yearArticle.time[time],articles[article].created_time)){
                yearArticle.value[time] +=1;
            }
        }
    }
    let categoryPag = {
        'categorys':categorys,
        'pags':pags,
        'articleTime':yearArticle
    }
    return  categoryPag
}

// 数组中的对象去重
function unique(arr){
    const res= new Map()
    return arr.filter((a)=> !res.has(a.name) && res.set(a.name,1))
}

//获取上个月时间
export function fromLastTime(time) {

    var date = new Date();
    var lastMonthDate = "";
    //获取当前几号，如果小于10则补0
    var month = date.getMonth() ;
    var year = date.getFullYear();
    //上个月小于1则证明跨年，年份减1
    if(month+time < 0 ){
        let year_last = `${parseInt(time/12)-1}`
        let month_last = (month+time)%12==12?12:12+time%12+1
        if (month_last<10){
            month_last = '0'+month_last
        }
        lastMonthDate = `${year+parseInt(year_last)}-${month_last}`;
    }else{
        lastMonthDate = `${year}-${month-1}`;
    }
    return lastMonthDate;
}
function compareTime(time,articleTime) {
    articleTime = articleTime.split('-')[0] + '-'+articleTime.split('-')[1]
    return time == articleTime;
}

