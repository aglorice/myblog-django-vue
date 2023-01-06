export function datetime(article){
    // 文章时间为有序的
    let yearDateTime = {};
    let yearDateTimeItem = [];
    let year = article[0]['created_time'].split('-')[0];  // 获取年份
    for(let i=0;i<article.length;i++){
        if (year != article[i]['created_time'].split('-')[0]){
            yearDateTime[year] = yearDateTimeItem
            year = article[i]['created_time'].split('-')[0]
            yearDateTimeItem = [];
        }
        yearDateTimeItem.push(article[i])
        // 判断结束的时候
        if (i === article.length - 1&&year === article[article.length-1]['created_time'].split('-')[0]){
            yearDateTime[year] = yearDateTimeItem
        }
    }
}
