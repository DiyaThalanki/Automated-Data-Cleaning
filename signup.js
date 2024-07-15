import { useState } from 'react';

export default function Signup() {
    const [files, setFiles] = useState(null);
    const [prompt, setPrompt] = useState('');

    const handleFileChange = (event) => {
        setFiles(event.target.files);
    };

    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        for (const file of files) {
            formData.append('files', file);
        }
        formData.append('prompt', prompt);

        // Post the data to the backend server
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log('Files and prompt submitted successfully');
            // Handle response here
        } else {
            console.error('Failed to submit files and prompt');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
            <form onSubmit={handleSubmit}>
                <h1>Sign Up for Data Cleaning</h1>
                <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    accept=".json, .xml"
                    style={{ display: 'block', marginBottom: '10px' }}
                />
                <textarea
                    value={prompt}
                    onChange={handlePromptChange}
                    placeholder="Enter your prompt"
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                ></textarea>
                <button type="submit" style={{ display: 'block', width: '100%' }}>
                    Submit
                </button>
            </form>
        </div>
    );
}
