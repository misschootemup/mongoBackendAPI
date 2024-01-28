const { Schema, model } = require("mongoose")
const reactionSchema = require("./reaction")
const thoughtschema = new Schema(
    {
        thoughttext: {
            type: String,
            require: true,
            min_length: 1, max_length: 280,
        },

        createAt: {
            type: Date,
            default: Date.now,
            required: true,
            get: (date) => date.toLocaleDateString()
        },

        username: {
            type: String,
            required: true,

        },

        reactions: [
            reactionSchema
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }

)

thoughtschema.virtual("reactionCount").get(function () {
    return this.reactions.length
})

const Thought=model("thought", thoughtschema)

module.exports=Thought