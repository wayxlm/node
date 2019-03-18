var express = require('express');
var router = express.Router();
var fs = require('fs');
const pathLib=require('path');
let uploadUrl=require('../../config/global').upload.user;//上传路径
let mgdb = require('../../common/mgdb');

router.post('/',(req,res,next)=>{
  console.log(req.body)
  let username = req.body.tel//拆除body数据
  let password = req.body.pass
  let time=Date.now();//创建服务器上传时间

 // multer拆出上传图片,需要解决没有上传头像
 // let icon = req.files.length ? uploadUrl + req.files[0].filename + pathLib.parse(req.files[0].originalname).ext : '';
  // console.log(icon);
  // if(icon){
  //   fs.renameSync(
  //     req.files[0].path,
  //     req.files[0].path+pathLib.parse(req.files[0].originalname).ext
  //   )
  // }else{
    let icon = '/upload/noimage.png';
    let nikename= '贝灵'

 // }

  //需要先判断用户是否存在ing。。。。。。。
  mgdb(
    {
      collection:'user'
    },
    ({collection,client})=>{
      collection.find({username}).toArray((err,result)=>{
        if(!err && result.length>0){
          res.send({error:1,msg:'用户名已存在'})
        }else{
          collection.insertOne(
            {username,password,time,icon,nikename}
            ,
            (err,result)=>{
              if(!err && result.result.n){
                console.log('result...........',result)
                res.send({error:0,msg:'注册成功',data:result.ops[0]})
              }else{
                res.send({error:2,msg:'网络错误'})
              }
              client.close();
            }
          )
        }
      })
      
    }
 );
  
})

module.exports=router;