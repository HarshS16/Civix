import React, { useState } from 'react';
import TextArea from '../components/TextArea';

export default function ReportIssue() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(''); //  NEW STATE
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [notifyByEmail, setNotifyByEmail] = useState(false); // ✅ new state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('email', email); 
    formData.append('description', description);
    formData.append('phone', phone);
    formData.append('notifyByEmail', notifyByEmail); // ✅ include in form data
    if (file) formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5001/api/report', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to submit issue.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Report an Issue</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
         <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
        required
      />
        <input
          type="text"
          placeholder="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <TextArea
          placeholder="Describe the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          counter={{ max: 100, show: true }}
        ></TextArea>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block"
        />

        {/* ✅ Notification Checkbox */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={notifyByEmail}
            onChange={() => setNotifyByEmail(!notifyByEmail)}
            className="accent-emerald-600"
          />
          <span className="text-sm text-gray-700">
            Notify me via email when the issue status changes
          </span>
        </label>

        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
