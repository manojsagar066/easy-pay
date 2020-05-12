var mongoose=require("mongoose");
var studentSchema = new mongoose.Schema({
    RFID:{ type: String, index: { unique: true } },
    name: String,
    USN: { type: String, index: { unique: true } },
    Course: String,
    DOB:String,
    Balance:Number,
    Mail:String,
    PhoneNo:Number,
});
var Stu =mongoose.model("Student",studentSchema);
module.exports=Stu;