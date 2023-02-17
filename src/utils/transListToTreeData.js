function transformed_data (_data,new_data = [],new_data_list = []){
    new_data = _data[0];
    new_data.label = _data[0].title
    if(_data.length === 1){
        return new_data
    }else {
        _data.forEach((item)=>{
            item.label = item.title
            new_data_list.push(item)
        })
        new_data.children = new_data_list.splice(1)
    }
    return new_data
}

function dispatch_data (_data,new_data=[]){
    _data.forEach((item)=>{
        new_data.push(transformed_data(item))
    })
    return new_data
}

/**
 * 将标题数据根据标题大小分割开
 * @param {object}data
 * @param {number}indent
 * @returns {*[]}
 */
function split_data (data,indent){
    let rets = [];

    data.forEach((item,index)=>{
        if(item.indent === indent){
            rets.push(index)
        }
    })

    let newArr = [] //首先创建一个新的空数组。用来存放分割好的数组
    for(let index = 0;index<rets.length;index++){
        newArr.push(data.slice(rets[index], rets[index+1]));
    }
    return newArr
}

export  function transListToTreeData(data){
    return dispatch_data(split_data(data,0))
}



