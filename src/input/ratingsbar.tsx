import { StarIcon } from "../svg/svg";

export function RatingsBar(props: { ratings?: number, reviews?: number }) {
    return <div class="flex items-center gap-2">
        <div class="flex items-center">
            {[...Array(Math.floor(props.ratings))].map(() => <StarIcon color="#fde047" />)}
            {[...Array((5 - Math.floor(props.ratings)))].map(() => <StarIcon color="#000000" />)}
        </div>

        {
            props.ratings && <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded night:bg-blue-200 night:text-blue-800 ms-3">{props.ratings}</span>
        }
        {
            props.reviews && <p class="text-sm font-medium text-gray-500 night:text-gray-400">({props.reviews})</p>
        }
    </div>;
}
