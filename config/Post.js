const mongoose = require("mongoose")
const PostSchema = new mongoose.Schema({
    product_name:{
        type: String,
    },
    product_description:{
        type: String,
    },
    quantity:{
        type: String,
    },
    price:{
        type: String,
    },
    file:{ 
        type: Array,
        default: []
     },
    hasoff:{
        type: Number,
        default: false
    },
    kids: {
        type: Boolean,
        default: false
    },
    male:{
        type: Boolean,
        default: false
    },
    female:{
        type: Boolean,
        default: false
    },
    season:{
        type: Boolean,
        default: false
    },
    status:{
        type: String,
        default: "published"
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

//mongoose.Schema.Types.Boolean.convertToFalse.add('false');
//mongoose.Schema.Types.Boolean.convertToTrue.add('true');
const Post = mongoose.model('post', PostSchema);

module.exports = Post