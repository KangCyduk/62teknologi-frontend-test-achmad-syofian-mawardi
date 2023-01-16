import React from 'react';
import { Rating } from 'react-simple-star-rating'

export default function StarRating(props){
    const ratingVal = Math.round(props.rating*2)/2;

    return(
        <div className="d-flex flex-row align-items-end">
            <div className="pe-2">
                <Rating
                    initialValue={ratingVal}
                    readonly={true}
                    fillColor={"#F0D946"}
                    emptyColor={"#F0F0F0"}
                    size={props.size}
                    allowFraction={true}
                />
            </div>
            <div className="review-txt">{props.numOfReviews} reviews</div>
        </div>
    )
}