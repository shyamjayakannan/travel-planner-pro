"use client";
import React, { useState } from "react";
import StarReviews from "./StarReviews";
import classes from "../../styles/ReviewsInput.module.css";
import useReviews from "../../Hook/useReviews";

const ReviewsInput = ({ setDataInput }) => {
  const { Reviews } = useReviews();
  const [countStar, setCountStar] = useState(0);
  const [description, setDescription] = useState("");

  const submitReviews = async () => {
    const data = {
      image: "Greece.jpg",
      star: countStar,
      description: description,
    };
    const response = await Reviews(data);
    if (response === "Success") {
      data["date"] =
        new Date().toLocaleDateString("en-US", {
          timeZone: "UTC",
        }) + " via Google";
      setDataInput(data);
      setDescription("");
      setCountStar(0);
    }
  };

  return (
    <div className={classes.container_item_star}>
      <div className={classes.headingstar}>Send your Reviews</div>
      <div className={classes.starContainer}>
        <StarReviews index={countStar} setCountStar={setCountStar} />
      </div>
      <div className={classes.reviewinput}>
        <textarea
          name="Text"
          id="description"
          placeholder="Send your Feedback!"
          cols="20"
          rows="6"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
      </div>
      <div className={classes.buttonSubmit} onClick={submitReviews}>
        Submit
      </div>
    </div>
  );
};

export default ReviewsInput;
