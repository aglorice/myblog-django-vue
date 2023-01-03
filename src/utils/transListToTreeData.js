export function transListToTreeData(list) {
    const startIndent = list[1].indent;
    const endIndent = list[1].indent + 1;
    let arr = [];
    for (let i=1;i<list.length;i++){
        // 如果标题大小等于开始的标题
        if (list[i].indent === startIndent){
            arr.push({
                label: list[i].title,
                lineIndex:list[i].lineIndex,
            })
            if(list[i+1].indent>list[i].indent){
                let children ={
                    label: list[i+1].title,
                    lineIndex:list[i+1].lineIndex,
                }
                if (arr[arr.length-1].children){
                    arr[arr.length-1].children.push(children)
                }else {
                    arr[arr.length-1].children = []
                }
                for(let j=i+1;list[j].indent>=endIndent;j++){
                    let children ={
                        label: list[j].title,
                        lineIndex:list[j].lineIndex,
                    }
                    if (arr[arr.length-1].children){
                        arr[arr.length-1].children.push(children)
                    }else {
                        arr[arr.length-1].children = []
                    }
                    if (j === list.length - 1 ){
                        break
                    }
                }
            }
        }


    }
    return arr
}
