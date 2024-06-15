const express = require('express');
const router = express.Router();
const { getAllStories, createStory, getStoryById, updateStory, deleteStory, addRating, addContributor, removeContributor } = require("../controller/storyController");

router.post('/', createStory);

router.get('/', getAllStories);

router.get('/:id', getStoryById);

router.put('/:id', updateStory);

router.delete('/:id', deleteStory);

router.post('/:id/ratings', addRating);

router.post('/:id/contributors', checkOwner, addContributor);
router.delete('/:id/contributors', checkOwner, removeContributor);

module.exports = router;
