export function article_type(article,type_value,type_key){
    let category = [];
    for (let i = 0; i<article.length;i++){
        if (article[i][type_key] == type_value){
            category.push(article[i]);
        }
    }
    return category;
}
