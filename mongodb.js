const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/mongodb');

db.connection.on('error',(error)=>{
  console.log(error)
});
db.connection.on('open',()=>{
  console.log('success')
});
db.connection.on('disconnected',()=>{
  console.log('disconnected')
});

// todo 定义了一个名为blogSchema的Schema
const blogSchema = new mongoose.Schema({
  title: String,
  comments:[{body:String, data:Date}] ,
  date:{type:Date, default: Date.now},
  hidden:Boolean,
  meta:{
    votes:Number,
    favs: Number,
  }
});

// todo 如需再添加数据，用add方法。
blogSchema.add({author: String, body: String});

// todo 将名为blogSchema的Schema与Blog名字绑定，即是存入数据库的名字，但存入数据库中的名字是Blogs，会自动添加一个s
const blogModel = mongoose.model('Blog', blogSchema);


// todo 这里将名为blogModel的Model实例化。之后我们可以用blogEntity名对数据进行保存并执行回调。
const blogEntity = new blogModel({
  title:'Mongoose',
  author:'L',
  body: 'Document are instance of out model. Creating them and saving to the database is easy',
  comments: [{body:"it's very coll! Thanks a lot!", date:"2014.07.28"}],
  hidden: false,
  mata: {
    votes: 100,
    favs: 99
  }
});


// todo  增(C)


const doc = {
  title:  "Mongoose",
  author: "L",
  body:   "Documents are instances of out model. Creating them and saving to the database is easy",
  comments: [{ body: "It's very cool! Thanks a lot!", date: "2014.07.28" }],
  hidden: false,
  meta: {
    votes: 100,
    favs:  99
  }
};

// todo Model.create(doc(s), [callback])
// blogModel.create(doc, (err, docs)=>{
//   if(err) console.log(err);
//   console.log(docs)
// });


// todo Model.save([options], [options.safe], [options.validateBeforeSave], [fn])
// blogEntity.save((err, docs)=>{
//   if(err) console.log(err);
//   console.log(docs)
// });


// todo Model.insertMany(doc(s), [options], [callback])
// 多条数据插入，将多条数据一次性插入，相对于循环使用create保存会更加快。

// blogModel.insertMany([
//   {title:'mongoose1', author:'L'},
//   {title:'mongoose2', author:'L'},
//   ],(err, docs)=>{
//    if(err) console.log(err);
//    console.log(docs);
//  });

// todo 查(R)

// todo Model.find(conditions, [projection], [options], [callback])
// conditions：查询条件；projection：控制返回的字段；options：控制选项；callback：回调函数。


//查询“title”标题为“Mongoose”，并且“meta”中“votes”字段值为“100”的记录，返回仅返回“title”、“author”、“body”三个字段的数据。
// blogModel.find(
//   {'title':'Mongoose', 'meta.votes': 100},
//   {title:1, author:1, body:1},
//   (err, docs)=>{
//     if(err) console.log(err);
//     console.log(docs)
//   });

// todo Model.findOne([conditions], [projection], [options], [callback])
//只返回第一个查询记录
//conditions：查询条件；projection：控制返回的字段；options：控制选项；callback：回调函数。

//Model.findById(id, [projection], [options], [callback])
//id：指定_id的值；projection：控制返回的字段；options：控制选项；callback：回调函数。

//改(U)
// todo Model.update(conditions, doc, [options], [callback])
// conditions：查询条件；doc：需要修改的数据，不能修改主键（_id）；options：控制选项；callback：回调函数，返回的是受影响的行数。
// options有以下选项：
// 　　safe (boolean)： 默认为true。安全模式。
// 　　upsert (boolean)： 默认为false。如果不存在则创建新记录。
// 　　multi (boolean)： 默认为false。是否更新多个查询记录。
// 　　runValidators： 如果值为true，执行Validation验证。
// 　　setDefaultsOnInsert： 如果upsert选项为true，在新建时插入文档定义的默认值。
// 　　strict (boolean)： 以strict模式进行更新。
// 　　overwrite (boolean)： 默认为false。禁用update-only模式，允许覆盖记录。


// 先查询“title”为“Mongoose”的数据，然后将它的“author”修改为“L”，“multi”为true允许更新多条查询记录。
// blogModel.update(
//   {title:'Mongoose'},
//   {author:'LL'},
//   {multi:true},
//   (err, docs)=>{
//     if(err) console.log(err);
//     console.log(docs)
//   }
// );

//  todo Model.updateMany(conditions, doc, [options], [callback])
// 一次更新多条
//
// todo Model.updateOne(conditions, doc, [options], [callback])
// 一次更新一条
//
// todo Model.findByIdAndUpdate(id, [update], [options], [callback])
// id：指定_id的值；update：需要修改的数据；options控制选项；callback回调函数。
// options有以下选项：
// 　　new： bool - 默认为false。返回修改后的数据。
// 　　upsert： bool - 默认为false。如果不存在则创建记录。
// 　　runValidators： 如果值为true，执行Validation验证。
// 　　setDefaultsOnInsert： 如果upsert选项为true，在新建时插入文档定义的默认值。
// 　　sort： 如果有多个查询条件，按顺序进行查询更新。
// 　　select： 设置数据的返回。
//
// todo Model.findOneAndUpdate([conditions], [update], [options], [callback])
// conditions：查询条件；update：需要修改的数据；options控制选项；callback回调函数。
// options有以下选项：
// 　　new： bool - 默认为false。返回修改后的数据。
// 　　upsert： bool - 默认为false。如果不存在则创建记录。
// 　　fields： {Object|String} - 选择字段。类似.select(fields).findOneAndUpdate()。
// 　　maxTimeMS： 查询用时上限。
// 　　sort： 如果有多个查询条件，按顺序进行查询更新。
// 　　runValidators： 如果值为true，执行Validation验证。
// 　　setDefaultsOnInsert： 如果upsert选项为true，在新建时插入文档定义的默认值。
// 　　passRawResult： 如果为真，将原始结果作为回调函数第三个参数。
//

// 删(D)
// todo Model.remove(conditions, [callback])


// 删除“author”值为“L”的记录。
// blogModel.remove({author: 'L'},(err, docs)=>{
//   if(err) console.log(err);
//   console.log(docs)
// });

// todo Model.findByIdAndRemove(id, [options], [callback])
// id：指定_id的值；update：需要修改的数据；options控制选项；callback回调函数。
// options有以下选项：
// 　　sort： 如果有多个查询条件，按顺序进行查询更新。
// 　　select： 设置数据的返回。

//Model.findOneAndRemove(conditions, [options], [callback])
// conditions：查询条件；update：需要修改的数据；options控制选项；callback回调函数。
// options有以下选项：
// 　　sort： 如果有多个查询条件，按顺序进行查询更新。
// 　　maxTimeMS： 查询用时上限。
// 　　select： 设置数据的返回。



// todo Query#exec([operation], [callback])
//使用find()、$where之类查询返回的是Mongoose自己封装的Query对象，使用find()可以在函数最后接上回调来获取查询到的数据。
// blogModel.find(
//     {title:'Mongoose', 'meta.votes': 100},
//     {title:1, author:1, body:1}
//   ).exec((err, docs)=>{
//   if(err) console.log(err);
//   console.log(docs)
// });


// 配合各种查询符可以方便的实现复杂的查询。
// 比如我需要查询“title”中以“Mongoose”开头，并且“meta”中“votes”的值小余100。并且按“meta”中“votes”的值升序排序。
// blogModel.find([
//   { title:{ $regex: 'Mongoose.+','$options':'i'}},
//   { 'meta.votes':{ $lt: 100}}
// ]).sort({ 'meta.votes':1}
// ).exec((err, docs)=>{
//   if(err) console.log(err);
//   console.log(docs)
// });

//比较查询运算符
// todo $equals 等于 ／ $gt 大于 ／ $gte 大于等于 ／ $lt 小余 ／ $lte 小余等于 ／ $ne 不等于 ／ $in 在数组中 ／ $nin 不在数组中

// blogModel.find({'meta.votes': {$lte: 100}}).exec((err,docs)=>{
//   if(err) console.log(err);
//   console.log(docs)
// });

// blogModel.find({$and: [
//   {'meta.votes':{$gte: 50}},
//   {'meta.votes':{$lt: 101}}
// ]}).exec((err,docs)=>{
//   if(err)console.log(err);
//   console.log(docs)
// });


