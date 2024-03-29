var express = require('express');
var router = express.Router();
var mgdb = require('../../common/mgdb')

router.get('/', function (req, res, next) {
    console.log(req.query)
  let {dataName,q,rule,start,count} = res.params;
  if (!dataName) {
    res.send({error:1,msg:'dataName为必传参数'})
    return;
  }


  mgdb({
    collection: 'product'
  }, ({ collection, client }) => {
    collection.find(
      {},
      {
        projection: {
          _id: 1, src: 1, name:1,price:1,goodsId:1
        },
      //  sort: rule ? { [rule]: -1 } : { 'time': -1 } //排序条件默认按时间排序
      }
    ).toArray((err, result) => {
      console.log(result)
   //   let checkResult = result.slice(start * count, start * count + count)//提取要分页的数据
      let data = {
        total:result.length,
        start:start+1,count,
        page_count: Math.ceil(result.length / count),//计算总页数
        page_data: result,
      }
      res.send({error:0,msg:'成功',...data});
      client.close();
    })
  })

});

module.exports = router;
