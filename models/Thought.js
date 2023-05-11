const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
// Schema to create Thought model

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1, 
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => {
                const date = new Date(timestamp);
                const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                return formattedDate;
            },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
      }
)

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

// initialize thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
