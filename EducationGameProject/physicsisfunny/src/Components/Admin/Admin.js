import React, { useState } from 'react';
import './Admin.css';

const tabTitles = ['Physics', 'Chemistry', 'Users', 'Statistics'];
const physicsTopics = [
  'Mechanics',
  'Modern physics',
  'Electromagnetism',
  'Optics',
  'Thermodynamics',
  'Relativity'
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(physicsTopics[0]);
  const [xmlFile, setXmlFile] = useState(null);
  const [fieldsetOpen, setFieldsetOpen] = useState(true); // Collapsible state
  const [editionFieldsetOpen, setEditionFieldsetOpen] = useState(true); // Add this state at the top with other useState

  return (
    <div
      className="admin-page w-full flex flex-col pt-0"
      style={{ minHeight: '70vh', maxHeight: '70vh', justifyContent: 'flex-start' }}
    >
      <div className="admin-tabs flex w-full mt-1">
        {tabTitles.map((title, idx) => (
          <button
            key={title}
            className={`admin-tab-btn flex-1 py-3 text-base font-semibold border-b-2 transition-colors duration-200
              ${activeTab === idx ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-gray-300 text-gray-600 bg-white'}
              hover:bg-blue-100`}
            onClick={() => setActiveTab(idx)}
          >
            {title}
          </button>
        ))}
      </div>
      <div
        className="w-full bg-white rounded shadow p-6"
        style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}
      >
        {activeTab === 0 && (
          <>
            {/* First fieldset: Insertion Quiz Data */}
            <fieldset
              className="border rounded-lg p-2 mb-4 bg-gray-50 w-full"
              style={{ maxHeight: 'none', overflowY: 'visible' }}
            >
              <legend
                className="font-semibold text-base mb-1 flex items-center cursor-pointer select-none"
                onClick={() => setFieldsetOpen(open => !open)}
                style={{ userSelect: 'none' }}
              >
                <span className="mr-2">
                  {fieldsetOpen ? '▼' : '►'}
                </span>
                Insertion Quiz Data
              </legend>
              {fieldsetOpen && (
                <form className="admin-form-row">
                  <select
                    className=""
                    value={selectedTopic}
                    onChange={e => setSelectedTopic(e.target.value)}
                  >
                    {physicsTopics.map(topic => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                  <input
                    type="file"
                    accept=".xml"
                    onChange={e => setXmlFile(e.target.files[0])}
                    className=""
                  />
                  <button
                    type="button"
                    className="icon-btn upload"
                    title="Upload"
                  >
                    <span className="material-icons">cloud_upload</span>
                  </button>
                </form>
              )}
            </fieldset>

            {/* Second fieldset: Edition Quiz Data */}
            <fieldset className="border rounded-lg p-2 mb-4 bg-gray-50 w-full" style={{ maxHeight: 'none', overflowY: 'visible' }}>
              <legend
                className="font-semibold text-base mb-1 flex items-center cursor-pointer select-none"
                onClick={() => setEditionFieldsetOpen(open => !open)}
                style={{ userSelect: 'none' }}
              >
                <span className="mr-2">
                  {editionFieldsetOpen ? '▼' : '►'}
                </span>
                Edition Quiz Data
              </legend>
              {editionFieldsetOpen && (
                <div className="flex flex-col md:flex-row gap-4 w-full items-start">
                  {/* Left: Datagrid */}
                  <div className="w-full md:w-2/3 overflow-auto mt-12">
                    <table className="min-w-full border text-xs md:text-sm bg-white rounded">
                      <thead>
                        <tr className="bg-gray-200">
                          <th>Identifier</th>
                          <th>Question</th>
                          <th>First Proposition</th>
                          <th>Second  Proposition</th>
                          <th>Third Proposition</th>
                          <th>Right Response</th>
                          <th>Image</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example row, replace with your data */}
                        <tr>
                          <td>Q1</td>
                          <td>What is Newton's second law?</td>
                          <td>F=ma</td>
                          <td>E=mc^2</td>
                          <td>V=IR</td>
                          <td>F=ma</td>
                          <td>-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* Right: Form */}
                  <div className="w-full md:w-1/3 flex flex-col gap-2">
                    {/* Icon buttons at the top */}
                    <div className="flex justify-end gap-2 mb-2">
                      <button type="button" className="icon-btn" title="Save">
                        <span className="material-icons">save</span>
                      </button>
                      <button type="button" className="icon-btn" title="Cancel" style={{ background: '#64748b' }}>
                        <span className="material-icons">cancel</span>
                      </button>
                      <button type="button" className="icon-btn" title="Delete" style={{ background: '#ef4444' }}>
                        <span className="material-icons">delete</span>
                      </button>
                    </div>
                    {/* Form fields */}
                    <input className="border rounded px-2 py-1" placeholder="Identifier" />
                    <input className="border rounded px-2 py-1" placeholder="English Question" />
                    <input className="border rounded px-2 py-1" placeholder="First English Proposition" />
                    <input className="border rounded px-2 py-1" placeholder="Second English Proposition" />
                    <input className="border rounded px-2 py-1" placeholder="Third English Proposition" />
                    <input className="border rounded px-2 py-1" placeholder="Right Response English" />
                    <input className="border rounded px-2 py-1" placeholder="French Question" />
                    <input className="border rounded px-2 py-1" placeholder="First French Proposition" />
                    <input className="border rounded px-2 py-1" placeholder="Second French Proposition" />
                    <input className="border rounded px-2 py-1" placeholder="Third French Proposition" />
                    <input className="border rounded px-2 py-1" placeholder="Right French Response" />
                    <input className="border rounded px-2 py-1" placeholder="Image URL" />
                  </div>
                </div>
              )}
            </fieldset>
          </>
        )}
        {activeTab === 1 && <div>Chemistry admin content goes here.</div>}
        {activeTab === 2 && <div>Users admin content goes here.</div>}
        {activeTab === 3 && <div>Statistics admin content goes here.</div>}
      </div>
    </div>
  );
};

export default Admin;