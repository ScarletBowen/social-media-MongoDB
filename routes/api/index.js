const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;
