import React, { useState } from 'react';
import './Admin.css';
import Swal from 'sweetalert2';

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
  const [fieldsetOpen, setFieldsetOpen] = useState(true);
  const [editionFieldsetOpen, setEditionFieldsetOpen] = useState(true);
  const [fileType, setFileType] = useState('data'); // <-- Add this state

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
                <form className="admin-form-row flex gap-2 items-center">
                  <select
                    className=""
                    value={selectedTopic}
                    onChange={e => setSelectedTopic(e.target.value)}
                  >
                    {physicsTopics.map(topic => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                  {/* New dropdown list for Data or Pictures */}
                  <select
                    className=""
                    value={fileType}
                    onChange={e => setFileType(e.target.value || 'data')}
                  >
                    <option value="data">Data</option>
                    <option value="pictures">Pictures</option>
                  </select>
                  <input
                    type="file"
                    accept={fileType === 'pictures' ? '.zip' : '.xml'}
                    onChange={e => {
                      const file = e.target.files[0];
                      if (fileType === 'pictures' && file && !file.name.endsWith('.zip')) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Invalid file',
                          text: 'Please select a .zip file.',
                        });
                        e.target.value = '';
                        return;
                      }
                      if (fileType === 'data' && file && !file.name.endsWith('.xml')) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Invalid file',
                          text: 'Please select a .xml file.',
                        });
                        e.target.value = '';
                        return;
                      }
                      setXmlFile(file);
                    }}
                    className=""
                    key={fileType} // This line forces the input to re-render when fileType changes
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
                  {/* Left: Datagrid (scrollable) */}
                  <div
                    className="w-full md:w-2/3 admin-datagrid-wrapper"
                    style={{ maxHeight: '500px', overflowY: 'auto', marginTop: '1.5rem' }}
                  >
                    <table className="admin-datagrid">
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
                        {/* Example rows, replace with your actual data */}
                        <tr>
                          <td>Q1</td>
                          <td>What is Newton's second law?</td>
                          <td>F=ma</td>
                          <td>E=mc^2</td>
                          <td>V=IR</td>
                          <td>F=ma</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>Q2</td>
                          <td>What is the speed of light?</td>
                          <td>3x10^8 m/s</td>
                          <td>1.5x10^8 m/s</td>
                          <td>9.8 m/s^2</td>
                          <td>3x10^8 m/s</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>Q3</td>
                          <td>Who formulated the law of universal gravitation?</td>
                          <td>Newton</td>
                          <td>Einstein</td>
                          <td>Galileo</td>
                          <td>Newton</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>Q4</td>
                          <td>What is the unit of electric current?</td>
                          <td>Ampere</td>
                          <td>Volt</td>
                          <td>Ohm</td>
                          <td>Ampere</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>Q5</td>
                          <td>What is the acceleration due to gravity on Earth?</td>
                          <td>9.8 m/s²</td>
                          <td>10 m/s²</td>
                          <td>8.9 m/s²</td>
                          <td>9.8 m/s²</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>Q6</td>
                          <td>Who is known as the father of modern physics?</td>
                          <td>Einstein</td>
                          <td>Newton</td>
                          <td>Galileo</td>
                          <td>Einstein</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>Q7</td>
                          <td>What is the formula for kinetic energy?</td>
                          <td>1/2mv²</td>
                          <td>mv</td>
                          <td>mgh</td>
                          <td>1/2mv²</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>Q8</td>
                          <td>What is the SI unit of force?</td>
                          <td>Newton</td>
                          <td>Joule</td>
                          <td>Watt</td>
                          <td>Newton</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>Q9</td>
                          <td>What is the value of Pi?</td>
                          <td>3.14</td>
                          <td>2.71</td>
                          <td>1.62</td>
                          <td>3.14</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>Q10</td>
                          <td>What is the chemical symbol for water?</td>
                          <td>H2O</td>
                          <td>O2</td>
                          <td>CO2</td>
                          <td>H2O</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>Q11</td>
                          <td>What is the main gas in Earth's atmosphere?</td>
                          <td>Nitrogen</td>
                          <td>Oxygen</td>
                          <td>Carbon Dioxide</td>
                          <td>Nitrogen</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>Q12</td>
                          <td>Who discovered radioactivity?</td>
                          <td>Marie Curie</td>
                          <td>Newton</td>
                          <td>Faraday</td>
                          <td>Marie Curie</td>
                          <td>-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* Right: Form (fixed width, does not scroll) */}
                  <div className="w-full md:w-1/3 flex-shrink-0 flex flex-col gap-2">
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