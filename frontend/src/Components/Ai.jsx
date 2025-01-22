import React, { useState, useEffect } from 'react';
import '../Style/ai.css'; 
import '../Style/navbar.css'; 

const Ai = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }), // Send the user's query to the backend
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(formatResponse(data.answer)); // Display the AI's response
        setQuery('');
      } else {
        alert(data.message); // Display an error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error processing your request.');
    }
  };

  const formatResponse = (text) => {
    // Replace `**` for bold sections and `*` for list items
    let formattedText = text
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') // Bold for **text**
      .replace(/\* ([^*]+)\n/g, '<li>$1</li>') // List items for * text
      .replace(/\n/g, '<br />') // New lines
      .replace(/•/g, '<li>'); // Handle bullet points if they're different

    // Add <ul> tags around the list items
    formattedText = `<ul>${formattedText}</ul>`;

    return formattedText;
  };


  useEffect(() => {
    document.body.style.background = `linear-gradient(135deg, rgba(160, 160, 160, 0.8), rgba(7, 42, 111, 0.8))`;
    document.body.style.display = `flex`;
    document.body.style.alignItems = `center`;
    document.body.style.justifyItems = `center`;

    document.querySelector(".indicator").style.border = `5px solid #9994a8`

    return () => {
      document.body.style.background = '';
    document.querySelector(".indicator").style.border = ''
    };
  }, []);

  return (
    <div className="ai-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Ask FitBuddy AI</h2>
        <div className="input-field">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about food, health, or meal plans"
            required
          />
        </div>
        <button type="submit">Ask AI</button>
      </form>

      {response && (
        <div className="response">
          <h3>AI Response:</h3>
          <div dangerouslySetInnerHTML={{ __html: response }} /> {/* Render HTML response */}
        </div>
      )}
    </div>
  );
};

export default Ai;

