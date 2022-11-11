import React, { useState } from "react";

export default function App() {

	const groceryList = [{
		tag: 'produce', name: 'apple'
	},{
		tag: 'produce', name: 'banana'
	},{
		tag: 'produce', name: 'carrot'
	},{
		tag: 'bakery', name: 'bread'
	},{
		tag: 'bakery', name: 'muffins'
	}]

	return (
		<div className="flex flex-col space-y-2 items-center pt-8 px-4">
			<FilterableListComponent initialList={groceryList} filterOnComponent="tag" />
		</div>
	);
}

function FilterableListComponent({ initialList, filterOnComponent }) {
	// filter out duplicate values
    const initialTags = initialList.map(item => item[filterOnComponent]).filter((val, index, self) => self.indexOf(val) === index)
	// set all tags to visible(selected) as default state
    const [selectedTags, setSelectedTags] = useState(initialTags);

	// filter out items which contain a tag not in our selectedTags array
	const filteredList =  initialList.filter((item) => selectedTags.includes(item.tag))

	// callback function handled when a user toggles a FilterButton
    const handleFilterClick = (tag) => {
        if (selectedTags.includes(tag)){
            setSelectedTags(selectedTags.filter((item) => item !== tag))
        }
        else{
            setSelectedTags([...selectedTags, tag])
        }
    }

    return (
        <>
        <div className="flex flex-row space-x-1">
            {initialTags.map((tag, tagIdx) => (
                <FilterButton key={tagIdx} className="p-2 bg-purple-100 rounded-md cursor:pointer" 
                onClick={() => handleFilterClick(tag)} title={tag} isSelected={selectedTags.includes(tag)}/>
            ))}
        </div>
        <div className="flex flex-col space-y-1 p-2">
            {filteredList.length === 0 ? "all items have been filtered out.." : null}
            {filteredList.map((item, itemIdx) => (
                <div key={itemIdx} className="w-24 flex justify-center py-1 bg-gray-100 rounded-md">
                    {item.name}
                </div>
            ))}
        </div>
        </>
    )
}

function FilterButton({ title, onClick, isSelected }) {
    return (
        <button className={`w-24 flex cursor-pointer justify-center py-1 rounded-full ${isSelected ? "bg-red-100 hover:bg-red-200" : "bg-gray-200 hover:bg-gray-100"}`} onClick={onClick}>
            {title}
        </button>
    )
}