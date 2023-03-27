import { PipelineStage, Types } from "mongoose";

export const getFavouritesQuery = (
  user: Types.ObjectId
): Array<PipelineStage> => [
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

export const getSpecificBookQuery = (
  bookId: Types.ObjectId
): Array<PipelineStage> => [
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
