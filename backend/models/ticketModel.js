const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.ObjectID,
        required: true,
        ref:"User"
    },
    product:{
        type:String,
        required:[
            true,
            'Please select a product'
        ],
        enum:['iPhone', 'Macbook Pro', 'iMac', 'iPad'],
        default: 'iPhone'
    },
    description:{
        type:String,
        required:[
            true,
            'Please enter a description'
        ]
    },
    status:{
        type:String,
        required:true,
        enum:['new', 'open', 'closed'],
        default: 'new'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Ticket', ticketSchema)