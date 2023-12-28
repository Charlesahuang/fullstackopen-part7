const commentsRouter = require('express').Router()
const Note = require('../models/note')
commentsRouter.post('/:id', async (request, response) => {
    const comment = request.body.comment;
    console.log('comment这里触发',comment);
    if (!comment) {
        return response.status(400).json({ error: 'Comment content is required' });
    }

    try {
        const note = await Note.findById(request.params.id);

        if (!note) {
            return response.status(404).json({ error: 'Note not found' });
        }

        note.comments.push(comment);
        await note.save();

        response.json(note);
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' });
    }
});

commentsRouter.get('/:id', async (request, response) => {
    try {
        const note = await Note.findById(request.params.id);

        if (!note) {
            return response.status(404).json({ error: 'Note not found' });
        }

        response.json(note.comments);
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' });
    }
});


commentsRouter.put('/:id/:commentId', async (request, response) => {
    const newComment = request.body.comment;

    if (!newComment) {
        return response.status(400).json({ error: 'Comment content is required' });
    }

    try {
        const note = await Note.findById(request.params.id);

        if (!note) {
            return response.status(404).json({ error: 'Note not found' });
        }

        const commentIndex = note.comments.findIndex(
            (comment) => comment._id.toString() === request.params.commentId
        );

        if (commentIndex === -1) {
            return response.status(404).json({ error: 'Comment not found' });
        }

        note.comments[commentIndex] = newComment;
        await note.save();

        response.json(note);
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' });
    }
});


commentsRouter.delete('/:id/:commentId', async (request, response) => {
    try {
        const note = await Note.findById(request.params.id);

        if (!note) {
            return response.status(404).json({ error: 'Note not found' });
        }

        const commentIndex = note.comments.findIndex(
            (comment) => comment._id.toString() === request.params.commentId
        );

        if (commentIndex === -1) {
            return response.status(404).json({ error: 'Comment not found' });
        }

        note.comments.splice(commentIndex, 1);
        await note.save();

        response.status(204).end();
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = commentsRouter