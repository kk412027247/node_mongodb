const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/info';
mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on('err',console.error.bind(console,'mongodb connection error: '));

const Schema = mongoose.Schema;

// 创建一个schema
const SomeModelSchema = new Schema({
  name:String,
  // a_string:String,
  //a_date:Date
}) ;

const schema = new Schema({
  name: String,
  binary: Buffer,
  living:Boolean,
  updated:{type: Date, default: Date.now},
  //Numbers有min 和max校验器。
  age:{ type: Number, min: 18, max:65, required: true},
  mixed: Schema.Types.Mixed,
  _someID:Schema.Types.ObjectId,
  array:[],
  ofString: [String],
  //属性是否会自动大写，小写或者去除空格(e.g. { type: String, lowercase: true, trim: true })。
  nested:{ stuff:{ type: String, lowercase: true, trim: true}}
});


// 创建一个Model，第一个参数是名称，第二个是创建model的schema，model嘛，怎删改查嘛
// Model相当于Document 的Collection
const SomeModel = mongoose.model('SomeModel',SomeModelSchema);

// 实例化的一个查询条件
const awesome_instance = new SomeModel({name:'awesome3'});

awesome_instance.save((err)=>{
  if(err) return (err);
  console.log('success')
});


