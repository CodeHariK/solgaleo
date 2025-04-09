import { IconStar } from "../svg/svg";

export function RatingsBar(props: { ratings?: number, reviews?: number }) {
    return <div class="flex items-center gap-2">
        <div class="flex items-center">
            {[...Array(Math.floor(props.ratings))].map(() => <IconStar props={{ color: "#fde047" }} />)}
            {[...Array((5 - Math.floor(props.ratings)))].map(() => <IconStar props={{ color: "#000000" }} />)}
        </div>

        {
            props.ratings && <span>{props.ratings}</span>
        }
        {
            props.reviews && <p>({props.reviews})</p>
        }
    </div>;
}
