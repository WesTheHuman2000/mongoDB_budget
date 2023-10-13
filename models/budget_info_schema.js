const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    color: {
        type: String,
        required: true
    }
  }, { collection: 'budget_info' });

module.exports = mongoose.model('budget_info', budgetSchema)