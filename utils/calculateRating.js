export default function calculateRating(rating) {

    const all_rating = rating.one + rating.two + rating.three + rating.four + rating.five;

    let rating_percentage = 0
    let rating_score = 0
    let rating_score_top = 0
    if (all_rating > 0) {
        rating_score = (rating.one * 1) + (rating.two * 2) + (rating.three * 3) + (rating.four * 4) + (rating.five * 5);
        rating_score_top = all_rating * 5;
        rating_percentage = Math.round(rating_score * 100 / rating_score_top)
    }

    return ({
        all_rating,
        rating_percentage,
        rating_score,
        rating_score_top
    })
}