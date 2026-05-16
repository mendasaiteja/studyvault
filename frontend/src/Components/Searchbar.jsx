import React, { useState } from 'react';

function Searchbar({
    files,
    filteredFiles,
    searchTerm,
    setSearchTerm,
    setfilteredFiles
}) {

    const handleInputChange = (e) => {
        const searchterm = e.target.value;

        setSearchTerm(searchterm);

        const filteredItems = files.filter((file) =>
            file.subject.toLowerCase().includes(searchterm.toLowerCase()) ||
            file.title.toLowerCase().includes(searchterm.toLowerCase())
        );

        setfilteredFiles(filteredItems);
    };
    const [suggestion, setSuggestion] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-6 pt-6">

            <div className="relative">
                <input
                    type="text"
                    placeholder="Search by title or subject..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className={`w-full bg-[#1a1c27] border-[#2a2d3a] text-[#e8e6f0]
    placeholder-[#4a4860] rounded-t-xl px-4 py-3 text-sm
    outline-none focus:border-[#534AB7] transition-colors cursor-pointer ${suggestion?``:`rounded-xl`}`}
                    onFocus={() => setSuggestion(true)}
                    onBlur={() => setSuggestion(false)}
                />
            </div>
            {
                suggestion ? (
                    <div className="bg-[#4a4860] text-white p-4 w-full overflow-hidden transition-all duration-300 ease-in-out">
                        {filteredFiles.map((file) => (
                            <p key={file._id} className='hover:bg-[#413f4d] cursor-pointer'>
                                {file.subject}
                            </p>
                        ))}
                    </div>
                ) : (<p className="p-3 text-gray-300">
                            No matching files
                    </p>
                )
            }
        </div>
    );
}

export default Searchbar;