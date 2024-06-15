const Story = require('../models/storyModel');

const getAllStories = async (req, res) => {
    try {
        const stories = await Story.find();
        res.status(200).json({ success: true, stories });
    } catch (error) {
        console.error('Error getting stories:', error);
        res.status(500).json({ success: false, message: 'Error while fetching stories', error: error.message });
    }
};

const createStory = async (req, res) => {
    try {
        const { name, content, owner, contributors, images } = req.body;
        console.log(req.body);
        const newStory = new Story({ name, content, owner, contributors, images });
        await newStory.save();
        res.status(201).json({ success: true, message: 'Story created successfully', story: newStory });
    } catch (error) {
        console.error('Error creating story:', error);
        res.status(500).json({ success: false, message: 'Error while creating story', error: error.message });
    }
};


const getStoryById = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id).populate('owner contributors ratings.userId', '-password');
        if (!story) {
            res.status(404).json({ success: false, message: 'Story not found' });
            return;
        }
        res.status(200).json({ success: true, story });
    } catch (error) {
        console.error('Error getting story by id:', error);
        res.status(500).json({ success: false, message: 'Error while fetching story', error: error.message });
    }
};

const updateStory = async (req, res) => {
    try {
        const { name, content, contributors } = req.body;
        const updatedStory = await Story.findByIdAndUpdate(
            req.params.id,
            { name, content, contributors },
            { new: true }
        );
        if (!updatedStory) {
            res.status(404).json({ success: false, message: 'Story not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'Story updated successfully', story: updatedStory });
    } catch (error) {
        console.error('Error updating story:', error);
        res.status(500).json({ success: false, message: 'Error while updating story', error: error.message });
    }
};

const deleteStory = async (req, res) => {
    try {
        const deletedStory = await Story.findByIdAndDelete(req.params.id);
        if (!deletedStory) {
            res.status(404).json({ success: false, message: 'Story not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'Story deleted successfully' });
    } catch (error) {
        console.error('Error deleting story:', error);
        res.status(500).json({ success: false, message: 'Error while deleting story', error: error.message });
    }
};

const addRating = async (req, res) => {
    try {
        const { userId, rating, message } = req.body;
        const newRating = { userId, rating, message };
        const updatedStory = await Story.findByIdAndUpdate(
            req.params.id,
            { $push: { ratings: newRating } },
            { new: true }
        );
        if (!updatedStory) {
            res.status(404).json({ success: false, message: 'Story not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'Rating added successfully', story: updatedStory });
    } catch (error) {
        console.error('Error adding rating:', error);
        res.status(500).json({ success: false, message: 'Error while adding rating', error: error.message });
    }
};
const addContributor = async (req, res) => {
    try {
        const { contributorId } = req.body;
        const story = req.story;

        if (!story.contributors.includes(contributorId)) {
            story.contributors.push(contributorId);
            await story.save();
            res.status(200).json({ success: true, message: 'Contributor added successfully', story });
        } else {
            res.status(400).json({ success: false, message: 'Contributor already exists' });
        }
    } catch (error) {
        console.error('Error adding contributor:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const removeContributor = async (req, res) => {
    try {
        const { contributorId } = req.body;
        const story = req.story;

        const index = story.contributors.indexOf(contributorId);
        if (index > -1) {
            story.contributors.splice(index, 1);
            await story.save();
            res.status(200).json({ success: true, message: 'Contributor removed successfully', story });
        } else {
            res.status(400).json({ success: false, message: 'Contributor not found' });
        }
    } catch (error) {
        console.error('Error removing contributor:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


module.exports = { addContributor, removeContributor, getAllStories, createStory, getStoryById, updateStory, deleteStory, addRating };
