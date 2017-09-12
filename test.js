var mongo = require('mongodb');
var Server = mongo.Server;    //引用主要的构造函数
var Db = mongo.Db;    //引用主要的构造函数

var conf = {
  url: '127.0.0.1',
  port: '27017',
  auto_: {auto_reconnect: true},
  db: 'test'
};

var server = new Server('127.0.0.1', '27017', {auto_reconnect: true});
//实例化数据库对象，接受三个参数，第一个是地址，第二个是端口，第三个是自动重新链接的设置
var db = new Db('test', server); //实例化链接，第一个参数是数据库的名称，第二个是 实例化的server对象

function openC(col,fun){   //用于打链接集合
  db.open(function(err){   //打开数据库
    if(err){
      console.log(err)
    }else{
      db.collection(col,{safe:true},function(err,result){
        //数据库操作接受三个参数，第一个是集合的名字，第二个是查询方式（安全），第三个是回掉函数，接受两个默认参数（错误，结果）
        if(!err){
          fun(result)
        }else{
          console.log(err)
        }
      })
    }
    db.close()    //如果用完了记得关闭
  });
}

openC('user',function(result){
  result.find().toArray(function(err, data){  //返回到result对象有个find方法，返回一个对象啊你个，将它转化程数组输出
    if(!err){
      console.log(data)
    }else{
      console.log(err)
    }
  });
});


