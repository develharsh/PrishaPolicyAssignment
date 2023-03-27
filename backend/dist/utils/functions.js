"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecificBookQuery = exports.getFavouritesQuery = void 0;
const getFavouritesQuery = (user) => [
    {
        $match: {
            user,
        },
    },
    {
        $lookup: {
            from: "books",
            localField: "book",
            foreignField: "_id",
            as: "book",
        },
    },
    {
        $unwind: {
            path: "$book",
            preserveNullAndEmptyArrays: false,
        },
    },
    {
        $project: {
            _id: "$book._id",
            title: "$book.title",
            addedBy: "$book.addedBy",
            author: "$book.author",
            description: "$book.description",
            bookReadTime: "$book.bookReadTime",
            coverFile: "$book.coverFile",
            pdfFile: "$book.pdfFile",
        },
    },
];
exports.getFavouritesQuery = getFavouritesQuery;
const getSpecificBookQuery = (bookId) => [
    {
        $match: {
            book: bookId,
        },
    },
    {
        $facet: {
            count: [
                {
                    $group: {
                        _id: null,
                        count: {
                            $sum: 1,
                        },
                        sumOfRating: {
                            $sum: "$rating",
                        },
                    },
                },
            ],
            recommended: [
                {
                    $match: {
                        rating: {
                            $gte: 4,
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        count: {
                            $sum: 1,
                        },
                    },
                },
            ],
            individualCount: [
                {
                    $group: {
                        _id: "$rating",
                        count: {
                            $sum: 1,
                        },
                    },
                },
            ],
        },
    },
];
exports.getSpecificBookQuery = getSpecificBookQuery;
