const { User, Thought, reactionSchema } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought by ID
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json({ thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      let thought = await Thought.findOne({ _id: req.params.id });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { thoughtText: req.body.thoughtText },
        { runValidators: true, new: true }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      await User.deleteMany({ _id: { $in: thought.user } });
      res.json({ message: 'Thought and user deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
  
      return res.json(`Reaction added`);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }
  
      return res.json({ message: 'Reaction removed' });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

};