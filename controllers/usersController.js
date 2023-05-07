const { User, Thought, reactionSchema } = require('../models');

// Aggregate function to get the number of users overall
const userCount = async () => {
  const numberOfUsers = await User.aggregate()
    .count('userCount');
  return numberOfUsers;
}

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
        userCount: await userCount(),
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({
        user,
        grade: await grade(req.params.userId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    const name = await User.findOneAndUpdate(
      { _id: req.params.Userid },
      { username: req.body.username },
      { new: true }
  );

  res.json(name)

    res.json({ message: 'User successfully updated' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

  // Delete a user and all associated thoughts

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      if (!thought) {
        return res.status(404).json({
          message: 'user, but no thoughts found',
        });
      }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a friend to a user's friend list
  async addFriend(req, res) {
    try {
        const userId = await User.findOne({ _id: req.params.userId })
        const friendId = await User.findOne({ _id: req.params.friendId });

        if (!userId || !friendId) {
            return res.status(404).json({ message: 'No user or friend found with that ID' })
        }

        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true }
        );

        return res.json(user)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},
async deleteFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )

        return res.json(user)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}
};

