var mongoose=require("mongoose");

var Fee_itemsSchema = new mongoose.Schema({
    FeeID:{ type: Number, index: { unique: true } },
    Feename: { type: String, index: { unique: true } },
    Feecost: Number,
    
});
var Fee_items =mongoose.model("Fee_items",Fee_itemsSchema);
module.exports=Fee_items;