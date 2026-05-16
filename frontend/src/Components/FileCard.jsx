import { useState, useEffect } from 'react';
import api from '../Api/api.js';
import Filedetails from '../Pages/Filedetails.jsx';
import Searchbar from './Searchbar.jsx';

function Filecard() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredFiles, setfilteredFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await api.get('/files');
                setFiles(response.data);
                setfilteredFiles(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);

    if (loading) {
        return (
            <p className="text-center text-[#4a4860] py-20 bg-[#0f1117]">
                Loading files...
            </p>
        );
    }

    if (files.length === 0) {
        return (
            <p className="text-center text-[#4a4860] py-20 bg-[#0f1117]">
                No files yet.
            </p>
        );
    }

    return (
        <>
            <Searchbar
                files={files}
                filteredFiles={filteredFiles}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setfilteredFiles={setfilteredFiles}
            />

            <Filedetails files={filteredFiles} />
        </>
    );
}

export default Filecard;