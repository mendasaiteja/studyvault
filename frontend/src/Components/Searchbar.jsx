import React, { useEffect, useState } from 'react';

function Searchbar({ files, searchTerm, setSearchTerm }) {

    const [suggestion, setSuggestion] = useState(false);
    const [suggestionsList, setSuggestionsList] = useState([]);
    const [debouncedValue, setDebouncedValue] = useState(searchTerm);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSuggestionsList([]);
            return;
        }
        const filteredItems = files.filter((file) =>
            file.subject.toLowerCase().includes(debouncedValue.toLowerCase()) ||
            file.title.toLowerCase().includes(debouncedValue.toLowerCase())
        );
        setSuggestionsList(filteredItems);
    }, [debouncedValue, files]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 pt-6 relative">

            <input
                type="text"
                placeholder="Search by title or subject..."
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => setSuggestion(true)}
                onBlur={() => {
                    setTimeout(() => {
                        setSuggestion(false);
                    }, 200);
                }}
                className={`w-full bg-[#1a1c27] border border-[#2a2d3a]
                text-[#e8e6f0] placeholder-[#4a4860]
                px-4 py-3 text-sm outline-none
                focus:border-[#534AB7]
                transition-all duration-300
                ${suggestion ? 'rounded-t-xl' : 'rounded-xl'}`}
            />

            <div
                className={`absolute left-6 right-6 overflow-hidden
                transition-all duration-300 ease-in-out z-50
                ${suggestion
                    ? 'max-h-72 opacity-100 translate-y-0'
                    : 'max-h-0 opacity-0 -translate-y-2'
                }`}
            >
                <div className="bg-[#4a4860] text-white rounded-b-xl shadow-lg">

                    {suggestionsList.length > 0 ? (
                        suggestionsList.map((file) => (
                            <p
                                key={file._id}
                                className="p-3 hover:bg-[#413f4d]
                                cursor-pointer transition-colors"
                            >
                                {file.subject}
                            </p>
                        ))
                    ) : (
                        searchTerm && (
                            <p className="p-3 text-gray-300">
                                No matching files
                            </p>
                        )
                    )}

                </div>
            </div>

        </div>
    );
}

export default Searchbar;