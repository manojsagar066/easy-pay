var mongoose=require("mongoose");

var transactionSchema = new mongoose.Schema({
    quantity: Number,
    Time: Date,
    Category:String,
    ID:Number,
    RFID:String,
    total_Cost:Number,
    item_name:String,
});
var Transactions = mongoose.model("Transactions",transactionSchema);
module.exports=Transactions;