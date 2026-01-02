import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Timeline } from "../models/timelineSchema.js";
import ErrorHandler from "../middlewares/error.js";

// 1. ADD NEW TIMELINE
export const postTimeline = catchAsyncErrors(async (req, res, next) => {
  const { title, description, from, to } = req.body;
  const newTimeline = await Timeline.create({
    title,
    description,
    timeline: { from, to },
  });
  res.status(200).json({
    success: true,
    message: "Timeline Added!",
    newTimeline,
  });
});

// 2. DELETE TIMELINE
export const deleteTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const timeline = await Timeline.findById(id);
  if (!timeline) {
    return next(new ErrorHandler("Timeline not found!", 404));
  }
  await timeline.deleteOne();
  res.status(200).json({
    success: true,
    message: "Timeline Deleted!",
  });
});

// 3. GET ALL TIMELINES
export const getAllTimelines = catchAsyncErrors(async (req, res, next) => {
  const timelines = await Timeline.find();
  res.status(200).json({
    success: true,
    timelines,
  });
});

// 4. UPDATE TIMELINE (New Function Added)
export const updateTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let timeline = await Timeline.findById(id);
  if (!timeline) {
    return next(new ErrorHandler("Timeline not found!", 404));
  }

  const newTimelineData = {
    title: req.body.title,
    description: req.body.description,
    timeline: {
        from: req.body.from,
        to: req.body.to,
    }
  };

  timeline = await Timeline.findByIdAndUpdate(id, newTimelineData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Timeline Updated!",
    timeline,
  });
});