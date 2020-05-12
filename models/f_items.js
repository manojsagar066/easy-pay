var mongoose=require("mongoose");

var itemsSchema = new mongoose.Schema({
    FID:{ type: Number, index: { unique: true } },
    Fname: { type: String, index: { unique: true } },
    Fcost: Number,
    
});
var Items =mongoose.model("Items",itemsSchema);
module.exports=Items;