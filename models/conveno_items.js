var mongoose=require("mongoose");

var C_itemsSchema = new mongoose.Schema({
    CID:{ type: Number, index: { unique: true } },
    Cname: { type: String, index: { unique: true } },
    Ccost: Number,
    
});
var C_items =mongoose.model("C_items",C_itemsSchema);
module.exports=C_items;