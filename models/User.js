const { Schema, model } = require('mongoose');
const Thought = require('./Thought')

// Schema to create User model
const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        max_length: 50,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ]
      },
      {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }

);

  // friendCount virtual
userSchema.virtual('friendCount').get(function() {
  return this.friends.length
})
  
const User = model('User', userSchema);
  
  module.exports = User;
  