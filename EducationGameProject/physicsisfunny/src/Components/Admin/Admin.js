import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './Admin.css';
import Swal from 'sweetalert2';
import importXml from '../../services/importXmlService';
import deleteQuestion from '../../services/deleteQuestionService';

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
  const [fileType, setFileType] = useState('data');
  const [questionsData, setQuestionsData] = useState([]);
  const [selectedIdentifier, setSelectedIdentifier] = useState(null);

  // Move columns definition here, so it can access selectedIdentifier and setSelectedIdentifier
  const columns = [
    { field: 'id', headerName: 'Select', width: 80, renderCell: (params) => (
        <input
          type="checkbox"
          checked={params.row.id === selectedIdentifier}
          onChange={() => setSelectedIdentifier(params.row.id)}
        />
      )
    },
    { field: 'Identifier', headerName: 'Identifier', width: 100 },
    { field: 'QuestionEn', headerName: 'Question (EN)', width: 200 },
    { field: 'ResponseAEn', headerName: 'Response A (EN)', width: 150 },
    { field: 'ResponseBEn', headerName: 'Response B (EN)', width: 150 },
    { field: 'ResponseCEn', headerName: 'Response C (EN)', width: 150 },
    { field: 'RightResponseEn', headerName: 'Right Response (EN)', width: 150 },
    { field: 'QuestionFr', headerName: 'Question (FR)', width: 200 },
    { field: 'ResponseAFr', headerName: 'Response A (FR)', width: 150 },
    { field: 'ResponseBFr', headerName: 'Response B (FR)', width: 150 },
    { field: 'ResponseCFr', headerName: 'Response C (FR)', width: 150 },
    { field: 'RightResponseFr', headerName: 'Right Response (FR)', width: 150 },
    { field: 'Image', headerName: 'Image', width: 120 },
  ];

  // Prepare rows for DataGrid (must have unique 'id' field)
  const rows = questionsData.map(q => ({
    ...q,
    id: q.Identifier
  }));

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
                    key={fileType}
                  />
                  <button
                    type="button"
                    className="icon-btn upload"
                    title="Upload"
                    onClick={async () => {
                      if (!xmlFile) return;
                      const fileContent = await xmlFile.text();
                      await importXml(fileContent, selectedTopic).then((response) => {
                        Swal.fire({
                          icon: 'success',
                          title: 'Success',
                          text: `File ${xmlFile.name} uploaded successfully!`,
                        });
                        setXmlFile(null); // Reset the file input
                        // Update questionsData from response if available
                        if (response.data && Array.isArray(response.data)) {
                          setQuestionsData(response.data);
                        }
                      }, (error) => {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: `Failed to upload file: ${error.response ? error.response.data : error.message}`,
                        });
                      }).catch((error) => {
                        if (error.response && error.response.data) {
                          Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: `Failed to upload file: ${error.response.data.message || error.response.data}`,
                          });
                        }
                      });
                    }}
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
              <div className="w-full md:w-2/3 admin-datagrid-wrapper" style={{ height: 500, marginTop: '1.5rem' }}>
                <DataGrid
                  rows={rows}
                  columns={columns.map(col =>
                    col.field === 'id'
                      ? { ...col, renderCell: (params) => (
                          <input
                            type="checkbox"
                            checked={params.row.id === selectedIdentifier}
                            onChange={() => setSelectedIdentifier(params.row.id)}
                          />
                        )}
                      : col
                  )}
                  pageSize={8}
                  onRowClick={(params) => setSelectedIdentifier(params.row.id)}
                  getRowClassName={(params) =>
                    params.row.id === selectedIdentifier ? 'bg-indigo-100' : ''
                  }
                  sx={{
                    '& .MuiDataGrid-row.Mui-selected': {
                      backgroundColor: '#e0e7ff !important',
                    }
                  }}
                />
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
                  <button
                    type="button"
                    className="icon-btn"
                    title="Delete"
                    style={{ background: '#ef4444' }}
                    onClick={async () => {
                      if (!selectedIdentifier) {
                        Swal.fire('No selection', 'Please select a question in the grid first.', 'info');
                        return;
                      }
                      const confirm = await Swal.fire({
                        title: 'Are you sure?',
                        text: `Delete question with Identifier: ${selectedIdentifier}?`,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, delete it!',
                        cancelButtonText: 'Cancel'
                      });
                      if (confirm.isConfirmed) {
                        try {
                          await deleteQuestion(selectedTopic, selectedIdentifier);
                          setQuestionsData(questionsData.filter(q => q.Identifier !== selectedIdentifier));
                          setSelectedIdentifier(null);
                          Swal.fire('Deleted!', 'The question has been deleted.', 'success');
                        } catch (error) {
                          Swal.fire('Error', 'Failed to delete question.', 'error');
                        }
                      }
                    }}
                  >
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
    </div >
  );
};

export default Admin;