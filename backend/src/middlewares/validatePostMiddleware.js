function validatePostMiddleware(req, res, next) {
    const { title, content, tags, status } = req.body;

    const errors = [];

    // Title validation
    if (
        !title ||
        typeof title !== "string" ||
        title.trim().length < 3 ||
        title.trim().length > 200
    ) {
        errors.push(
            "Title must be between 3 and 200 characters."
        );
    }

    // Content validation
    if (
        !content ||
        typeof content !== "string" ||
        content.trim().length < 10
    ) {
        errors.push(
            "Content must be at least 10 characters long."
        );
    }

    // Tags validation
    if (!Array.isArray(tags) || tags.length === 0) {
        errors.push(
            "Tags must be a non-empty array."
        );
    }

    // Status validation (optional field)
    if (
        status &&
        !["draft", "published"].includes(status)
    ) {
        errors.push(
            "Status must be either 'draft' or 'published'."
        );
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors,
        });
    }

    next();
}

module.exports = validatePostMiddleware;
