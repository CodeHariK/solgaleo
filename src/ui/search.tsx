import { SearchIcon } from "../svg/svg";
import { useSpaceContext } from "./spaceform";

/*CSS:
.searchinput {
    position: relative;
}

.searchinput > div {
    display: flex; 
    position: absolute; 
    top: 0;
    bottom: 0; 
    align-items: center; 
    pointer-events: none;
    inset-inline-start: 0px;
    padding-inline-start: 0.75rem;
}

input[type="search"] {
    display: block; 
    padding: 1rem; 
    border-radius: 0.5rem; 
    border-width: 1px; 
    border-color: #D1D5DB; 
    width: 100%; 
    font-size: 0.875rem;
    line-height: 1.25rem; 
    color: #111827; 
    background-color: #F9FAFB; 
    padding-inline-start: 2.5rem;
}

.searchinput > button {
    position: absolute; 
    bottom: 0.625rem; 
    padding-top: 0.5rem;
    padding-bottom: 0.5rem; 
    padding-left: 1rem;
    padding-right: 1rem; 
    border-radius: 0.5rem; 
    font-size: 0.875rem;
    line-height: 1.25rem; 
    font-weight: 500; 
    color: #ffffff; 
    background-color: #1D4ED8;
    inset-inline-end: 0.625rem;
    bottom: 0.625rem;
}
.searchinput > button:hover {
    background-color: #1E40AF;
}
.searchinput > button:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
*/

type SearchInputProps = {
    name: string;
    placeholder: string;
};

export function SearchInput(props: SearchInputProps) {
    const { handleChange } = useSpaceContext();

    return (
        <div class="searchinput">
            <div>
                <SearchIcon />
            </div>

            <input type="search" id="search"
                placeholder={props.placeholder}
                onInput={(e) => {
                    handleChange(props.name, e.target.value)
                }} required />

            <button type="submit">Search</button>
        </div>
    );
}
