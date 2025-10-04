import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './Admin.css';
import Swal from 'sweetalert2';
import importXml from '../../services/importXmlService';
import deleteQuestion from '../../services/deleteQuestionService';
import {getQuestions} from '../../services/getQuestionsService'; // Add this import
import updateQuestions from '../../services/updateQuestionsService';
import uploadImagesZip from '../../services/uploadImagesZipService'; // Add this import
import { importChemistryXml, getChemistryQuestions, updateChemistryQuestions, deleteChemistryQuestion } from '../../services/importChemistryXmlService'; // Update import
import notFoundImage from '../../images/404.png';
import Shapes from '../Chemistry/Shapes.js'; // Import Shapes component
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getAllUsers, activateUser, deactivateUser, deleteUser } from '../../services/userService';
import { countries } from '../../data/countries';

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
  const [originalQuestion, setOriginalQuestion] = useState(null);
  const [changedQuestions, setChangedQuestions] = useState([]);
  const [imagePopup, setImagePopup] = useState({ open: false, src: '' });
  const [questionChemistryData, setQuestionChemistryData] = useState([]);
  const [changedChemistryRows, setChangedChemistryRows] = useState([]);
  const [originalChemistryRow, setOriginalChemistryRow] = useState(null); // Add this state near your other states
  const [showShapesPopup, setShowShapesPopup] = useState(false);
  const [popupChemicalData, setPopupChemicalData] = useState([]);
  const [users, setUsers] = useState([]);

  // Function to get country name from country code
  const getCountryName = (countryCode) => {
    if (!countryCode) return 'Unknown';
    const country = countries.find(c => c.code === countryCode);
    return country ? country.name : countryCode;
  };

  // User action handlers
  const handleActivateUser = async (username) => {
    try {
      const result = await Swal.fire({
        title: 'Activate User',
        text: `Are you sure you want to activate user: ${username}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, activate!'
      });
      
      if (result.isConfirmed) {
        await activateUser(username);
        Swal.fire(
          'Activated!',
          'User has been activated successfully.',
          'success'
        );
        // Refresh the user list
        const response = await getAllUsers();
        setUsers(response);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to activate user.',
      });
    }
  };

  const handleDeactivateUser = async (username) => {
    try {
      const result = await Swal.fire({
        title: 'Deactivate User',
        text: `Are you sure you want to deactivate user: ${username}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, deactivate!'
      });
      
      if (result.isConfirmed) {
        await deactivateUser(username);
        Swal.fire(
          'Deactivated!',
          'User has been deactivated successfully.',
          'success'
        );
        // Refresh the user list
        const response = await getAllUsers();
        setUsers(response);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to deactivate user.',
      });
    }
  };

  const handleDeleteUser = async (username) => {
    try {
      const result = await Swal.fire({
        title: 'Delete User',
        text: `Are you sure you want to permanently delete user: ${username}? This action cannot be undone!`,
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete!'
      });
      
      if (result.isConfirmed) {
        await deleteUser(username);
        Swal.fire(
          'Deleted!',
          'User has been deleted successfully.',
          'success'
        );
        // Refresh the user list
        const response = await getAllUsers();
        setUsers(response);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to delete user.',
      });
    }
  };

  // Find the selected question object
  const selectedQuestion = questionsData.find(q => q.Identifier === selectedIdentifier) || {};

  // Move columns definition here, so it can access selectedIdentifier and setSelectedIdentifier
  const columns = [
    {
      field: 'id',
      headerName: 'Select',
      flex: 1,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={params.row.id === selectedIdentifier}
          onChange={e => {
            // Toggle selection: deselect if already selected, select if not
            setSelectedIdentifier(
              params.row.id === selectedIdentifier ? null : params.row.id
            );
          }}
        />
      )
    },
    { field: 'Identifier', headerName: 'Identifier', flex: 1 },
    { field: 'QuestionEn', headerName: 'Question (EN)', flex: 2 },
    { field: 'ResponseAEn', headerName: 'Response A (EN)', flex: 1 },
    { field: 'ResponseBEn', headerName: 'Response B (EN)', flex: 1 },
    { field: 'ResponseCEn', headerName: 'Response C (EN)', width: 150 },
    { field: 'RightResponseEn', headerName: 'Right Response (EN)', width: 150 },
    {
      field: 'Image',
      headerName: 'Image',
      width: 120,
      renderCell: (params) =>
        params.value ? (
          <a
            href="#"
            style={{ color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}
            onClick={e => {
              e.preventDefault();
              const imageUrl = `${process.env.REACT_APP_SERVER_URL}/files/${selectedTopic}/${params.value}.png`;
              setImagePopup({ open: true, src: imageUrl });
            }}
          >
            {params.value}
          </a>
        ) : (
          <span style={{ color: '#888' }}>No Image</span>
        )
    }
  ];

  // Prepare rows for DataGrid (must have unique 'id' field)
  const rows = questionsData.map(q => ({
    ...q,
    id: q.Identifier
  }));

  // When a row is selected, store its original data for cancel
  useEffect(() => {
    if (selectedIdentifier) {
      const found = questionsData.find(q => q.Identifier === selectedIdentifier);
      setOriginalQuestion(found ? { ...found } : null);
    } else {
      setOriginalQuestion(null);
    }
  }, [selectedIdentifier]);

  // Fetch questions when selectedTopic changes
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions(selectedTopic);
        if (response.data && Array.isArray(response.data)) {
          setQuestionsData(response.data);
          setSelectedIdentifier(null); // Optionally clear selection
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to retrieve questions for the selected topic.',
        });
      }
    };

    fetchQuestions();
  }, [selectedTopic]);

  // Update changedQuestions whenever a question is edited
  const handleQuestionChange = (field, value) => {
    setQuestionsData(questionsData.map(q =>
      q.Identifier === selectedIdentifier
        ? { ...q, [field]: value }
        : q
    ));

    setChangedQuestions(prev => {
      const alreadyChanged = prev.find(q => q.Identifier === selectedIdentifier);
      const updatedQuestion = {
        ...questionsData.find(q => q.Identifier === selectedIdentifier),
        [field]: value
      };
      if (alreadyChanged) {
        return prev.map(q =>
          q.Identifier === selectedIdentifier ? updatedQuestion : q
        );
      } else {
        return [...prev, updatedQuestion];
      }
    });
  };

  // Fetch chemistry questions when the second fieldset is opened
  useEffect(() => {
    if (activeTab === 1 && editionFieldsetOpen) {
      const fetchChemistryQuestions = async () => {
        try {
          const response = await getChemistryQuestions();
          if (response.data && Array.isArray(response.data)) {
            setQuestionChemistryData(response.data);
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to retrieve chemistry questions.',
          });
        }
      };
      fetchChemistryQuestions();
    }
  }, [activeTab, editionFieldsetOpen]);

  // Handler for editing a chemistry question field
  const handleChemistryFieldChange = (field, value) => {
    setQuestionChemistryData(questionChemistryData.map(q =>
      q.Id === selectedIdentifier ? { ...q, [field]: value } : q
    ));

    setChangedChemistryRows(prev => {
      const alreadyChanged = prev.find(q => q.Id === selectedIdentifier);
      const updatedRow = {
        ...questionChemistryData.find(q => q.Id === selectedIdentifier),
        [field]: value
      };
      if (alreadyChanged) {
        return prev.map(q =>
          q.Id === selectedIdentifier ? updatedRow : q
        );
      } else {
        return [...prev, updatedRow];
      }
    });
  };

  // When a row is selected, store its original data
  useEffect(() => {
    if (selectedIdentifier) {
      const found = questionChemistryData.find(q => q.Id === selectedIdentifier);
      setOriginalChemistryRow(found ? { ...found } : null);
    } else {
      setOriginalChemistryRow(null);
    }
  }, [selectedIdentifier, questionChemistryData]);

  useEffect(() => {
    if (activeTab === 2) {
      const fetchUsers = async () => {
        try {
          const response = await getAllUsers();
          console.log(JSON.stringify(response));
          setUsers(response);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to retrieve users.',
          });
        }
      };
      fetchUsers();
    }
  }, [activeTab]);

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

                      if (fileType === 'pictures') {
                        try {
                          await uploadImagesZip(xmlFile, selectedTopic);
                          Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: `Pictures zip uploaded successfully!`,
                          });
                          setXmlFile(null);
                        } catch (error) {
                          Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: `Failed to upload pictures zip: ${error.response?.data || error.message}`,
                          });
                        }
                        return;
                      }

                      // ...existing XML upload logic...
                      const fileContent = await xmlFile.text();
                      await importXml(fileContent, selectedTopic).then((response) => {
                        Swal.fire({
                          icon: 'success',
                          title: 'Success',
                          text: `File ${xmlFile.name} uploaded successfully!`,
                        });
                        setXmlFile(null); // Reset the file input
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
              <div className="admin-datagrid-wrapper">
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={8}
                  onRowClick={(params) => {
                    setSelectedIdentifier(
                      params.row.id === selectedIdentifier ? null : params.row.id
                    );
                  }}
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
              <div className="admin-edition-form">
                {/* Icon buttons at the top */}
                <div className="flex justify-end gap-2 mb-2">
                  <button
                    type="button"
                    className="icon-btn"
                    title="Save"
                    onClick={async () => {
                      if (changedQuestions.length === 0) {
                        Swal.fire('No changes', 'There are no changes to save.', 'info');
                        return;
                      }
                      try {
                        await updateQuestions(selectedTopic, changedQuestions);
                        Swal.fire('Saved!', 'Changes have been saved successfully.', 'success');
                        setChangedQuestions([]); // Clear changed questions after save
                        // Optionally refresh questions from server
                        const response = await getQuestions(selectedTopic);
                        if (response.data && Array.isArray(response.data)) {
                          setQuestionsData(response.data);
                          setSelectedIdentifier(null);
                        }
                      } catch (error) {
                        Swal.fire('Error', 'Failed to save changes.', 'error');
                      }
                    }}
                  >
                    <span className="material-icons">save</span>
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    style={{ background: '#64748b' }}
                    onClick={() => {
                      if (originalQuestion) {
                        setQuestionsData(questionsData.map(q =>
                          q.Identifier === selectedIdentifier ? { ...originalQuestion } : q
                        ));
                        // Force refresh of displayed data by resetting selectedIdentifier
                        setSelectedIdentifier(null);
                        setTimeout(() => setSelectedIdentifier(originalQuestion.Identifier), 0);
                      }
                    }}
                  >
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
                {/* Form fields, now controlled by selectedQuestion */}
                <input
                  className="border rounded px-2 py-1"
                  placeholder="Identifier"
                  value={selectedQuestion.Identifier || ''}
                  readOnly
                />
                <input
                  className="border rounded px-2 py-1"
                  placeholder="English Question"
                  value={selectedQuestion.QuestionEn || ''}
                  onChange={e => handleQuestionChange('QuestionEn', e.target.value)}
                />
                <input
                  className="border rounded px-2 py-1"
                  placeholder="First English Proposition"
                  value={selectedQuestion.ResponseAEn || ''}
                  onChange={e => handleQuestionChange('ResponseAEn', e.target.value)}
                />
                <input
                  className="border rounded px-2 py-1"
                  placeholder="Second English Proposition"
                  value={selectedQuestion.ResponseBEn || ''}
                  onChange={e => handleQuestionChange('ResponseBEn', e.target.value)}
                />
                <input
                  className="border rounded px-2 py-1"
                  placeholder="Third English Proposition"
                  value={selectedQuestion.ResponseCEn || ''}
                  onChange={e => handleQuestionChange('ResponseCEn', e.target.value)}
                />
                <input
                  className="border rounded px-2 py-1"
                  placeholder="Right Response English"
                  value={selectedQuestion.RightResponseEn || ''}
                  onChange={e => handleQuestionChange('RightResponseEn', e.target.value)}
                />
                <input
                  className="border rounded px-2 py-1"
                  placeholder="French Question"
                  value={selectedQuestion.QuestionFr || ''}
                  onChange={e => handleQuestionChange('QuestionFr', e.target.value)}
                />
                <input
                  className="border rounded px-2 py-1"
                  placeholder="First French Proposition"
                  value={selectedQuestion.ResponseAFr || ''}
                  onChange={e => handleQuestionChange('ResponseAFr', e.target.value)}
                />
                <input
                  className="border rounded px-2 py-1"
                  placeholder="Second French Proposition"
                  value={selectedQuestion.ResponseBFr || ''}
                  onChange={e => handleQuestionChange('ResponseBFr', e.target.value)}
                />
                <input
                  className="border rounded px-2 py-1"
                  placeholder="Third French Proposition"
                  value={selectedQuestion.ResponseCFr || ''}
                  onChange={e => handleQuestionChange('ResponseCFr', e.target.value)}
                />
                <input
                  className="border rounded px-2 py-1"
                  placeholder="Right French Response"
                  value={selectedQuestion.RightResponseFr || ''}
                  onChange={e => handleQuestionChange('RightResponseFr', e.target.value)}
                />
                <input
                  className="border rounded px-2 py-1"
                  placeholder="Image URL"
                  value={selectedQuestion.Image || ''}
                  onChange={e => handleQuestionChange('Image', e.target.value)}
                />
              </div>
            </div>
          )}
        </fieldset>
      </>
        )}
      {activeTab === 1 && (
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
        <form className="flex flex-row gap-2 w-full items-center">
          <input
            type="file"
            accept=".xml"
            onChange={e => {
              const file = e.target.files[0];
              setXmlFile(file || null);
            }}
            className="border rounded px-2 py-1"
            style={{ flex: 1 }}
          />
          <button
            type="button"
            className="icon-btn upload"
            title="Upload"
            onClick={async () => {
              if (!xmlFile) {
                Swal.fire({
                  icon: 'error',
                  title: 'No file selected',
                  text: 'Please select a .xml file to upload.',
                });
                return;
              }
              if (!xmlFile.name.endsWith('.xml')) {
                Swal.fire({
                  icon: 'error',
                  title: 'Invalid file',
                  text: 'Please select a .xml file.',
                });
                return;
              }
              try {
                const response = await importChemistryXml(xmlFile);
                Swal.fire({
                  icon: 'success',
                  title: 'Success',
                  text: `File ${xmlFile.name} uploaded successfully!`,
                });
                setXmlFile(null); // Reset the file input
                // Optionally handle response.data here
              } catch (error) {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                 // text: `Failed to upload file: ${error.response ? error.response.data : error.message}`,
                 text: `Failed to upload file: ${JSON.stringify(error.response?.data || error.message)}`,
                });
              }
            }}
            style={{
              flex: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: '#2563eb',
              color: '#fff',
              borderRadius: '6px',
              border: 'none',
              padding: '6px 16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            <span className="material-icons">cloud_upload</span>
          </button>
        </form>
      )}
    </fieldset>

    {/* Second fieldset: Edition Quiz Data */}
    <fieldset
      className="border rounded-lg p-2 mb-4 bg-gray-50 w-full"
      style={{ maxHeight: 'none', overflowY: 'visible' }}
    >
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
              <div className="admin-datagrid-wrapper">
                <DataGrid
              rows={questionChemistryData}
              getRowId={row => row.Id}
              columns={[
                {
                  field: 'select',
                  field: 'displayChemicalData',
                  headerName: '',
                  width: 60,
                  renderCell: (params) => (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      width: '100%'
                    }}>
                      <button
                        type="button"
                        className="icon-btn"
                        title="Display"
                        onClick={() => {
                          
                          // Parse chemical data for Shapes
                          const chemData = (String(params.row.ChemicalData).split(';').map(row =>  {return row.split(',')}) || [])
                          setPopupChemicalData(chemData);
                          setShowShapesPopup(true);
                        }}
                        style={{
                          background: '#2563eb',
                          color: '#fff',
                          borderRadius: '6px',
                          border: 'none',
                          padding: '6px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <span className="material-icons">visibility</span>
                      </button>
                    </div>
                  )
                }
              ]}
              pageSize={8}
              onRowClick={(params) => {
                setSelectedIdentifier(
                  params.row.Id === selectedIdentifier ? null : params.row.Id
                );
              }}
              getRowClassName={(params) =>
                params.row.Id === selectedIdentifier ? 'bg-indigo-100' : ''
              }
              sx={{
                '& .MuiDataGrid-row.Mui-selected': {
                  backgroundColor: '#e0e7ff !important',
                }
              }}
            />
          </div>
          {/* Right: Form for editing selected row */}
          <div className="w-full md:w-1/3 flex-shrink-0 flex flex-col gap-2">
            {(() => {
              const selectedRow = questionChemistryData.find(q => q.Id === selectedIdentifier) || {};
              return (
                <form className="flex flex-col gap-2">
                  {/* Top buttons with icons */}
                  <div className="flex justify-end gap-2 mb-2">
                    <button
                      type="button"
                      className="icon-btn"
                      title="Save"
                      onClick={async () => {
                        if (changedChemistryRows.length === 0) {
                          Swal.fire('No changes', 'There are no changes to save.', 'info');
                          return;
                        }
                        try {
                          await updateChemistryQuestions(changedChemistryRows);
                          Swal.fire('Saved!', 'Changes have been saved successfully.', 'success');
                          setChangedChemistryRows([]); // Clear changed rows after save
                          // Optionally refresh chemistry questions from server
                          const response = await getChemistryQuestions();
                          if (response.data && Array.isArray(response.data)) {
                            setQuestionChemistryData(response.data);
                            setSelectedIdentifier(null);
                          }
                        } catch (error) {
                          Swal.fire('Error', 'Failed to save changes.', 'error');
                        }
                      }}
                    >
                      <span className="material-icons">save</span>
                    </button>
                    <button
                      type="button"
                      className="icon-btn"
                      title="Cancel"
                      style={{ background: '#64748b' }}
                      onClick={async () => {
                        // Cancel changes: restore previous values for selected row
                        if (originalChemistryRow) {
                          setQuestionChemistryData(questionChemistryData.map(q =>
                            q.Id === selectedIdentifier ? { ...originalChemistryRow } : q
                          ));
                        }
                        setChangedChemistryRows(changedChemistryRows.filter(q => q.Id !== selectedIdentifier));
                        // Refresh data from server to ensure latest state
                        try {
                          const response = await getChemistryQuestions();
                          if (response.data && Array.isArray(response.data)) {
                            setQuestionChemistryData(response.data);
                          }
                        } catch (error) {
                          Swal.fire('Error', 'Failed to refresh chemistry questions.', 'error');
                        }
                        Swal.fire('Cancelled', 'Changes have been reverted.', 'info');
                      }}
                    >
                      <span className="material-icons">cancel</span>
                    </button>
                    <button
                      type="button"
                      className="icon-btn"
                      title="Delete"
                      style={{ background: '#ef4444' }}
                      onClick={async () => {
                        if (!selectedIdentifier) {
                          Swal.fire('No selection', 'Please select a row to delete.', 'info');
                          return;
                        }
                        const confirm = await Swal.fire({
                          title: 'Are you sure?',
                          text: `Delete chemistry question with Id: ${selectedIdentifier}?`,
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonText: 'Yes, delete it!',
                          cancelButtonText: 'Cancel'
                        });
                        if (confirm.isConfirmed) {
                          try {
                            await deleteChemistryQuestion(selectedIdentifier);
                            // Refresh data from server after deletion
                            const response = await getChemistryQuestions();
                            if (response.data && Array.isArray(response.data)) {
                              setQuestionChemistryData(response.data);
                              setSelectedIdentifier(null);
                            }
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
                  <input
                    className="border rounded px-2 py-1"
                    placeholder="Identifier"
                    value={selectedRow.Id || ''}
                    readOnly
                  />
                  <textarea
                    className="border rounded px-2 py-1"
                    placeholder="Definition"
                    value={selectedRow.Definition || ''}
                    onChange={e => handleChemistryFieldChange('Definition', e.target.value)}
                  />
                  <input
                    className="border rounded px-2 py-1"
                    placeholder="Chemical Data"
                    value={selectedRow.ChemicalData || ''}
                    onChange={e => handleChemistryFieldChange('ChemicalData', e.target.value)}
                  />
                  <input
                    className="border rounded px-2 py-1"
                    placeholder="Score"
                    value={selectedRow.RightResponse || ''}
                    onChange={e => handleChemistryFieldChange('RightResponse', e.target.value)}
                  />
                  <textarea
                    className="border rounded px-2 py-1"
                    placeholder="Response Text"
                    value={selectedRow.ResponseText || ''}
                    onChange={e => handleChemistryFieldChange('ResponseText', e.target.value)}
                  />
                </form>
              );
            })()}
          </div>
        </div>
      )}
    </fieldset>
  </>
)}
      {activeTab === 2 && (
        <div>
          <h2 className="text-lg font-bold mb-2">Users List</h2>
          <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users.map(user => ({
          id: user.IdUser, // DataGrid requires a unique 'id' field
          UserName: user.UserName,
          Email: user.Email,
          Country: getCountryName(user.Country)
        }))}
        columns={[
          { field: 'UserName', headerName: 'User Name', flex: 1 },
          { field: 'Email', headerName: 'Email', flex: 1 },
          { field: 'Country', headerName: 'Country', flex: 1 },
          {
            field: 'activate',
            headerName: 'Activate',
            width: 80,
            sortable: false,
            renderCell: (params) => (
              <button
                onClick={() => handleActivateUser(params.row.UserName)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: '#10b981',
                  padding: '4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                  e.target.style.color = '#059669';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#10b981';
                }}
                title="Activate User"
              >
                ✓
              </button>
            )
          },
          {
            field: 'deactivate',
            headerName: 'Deactivate',
            width: 90,
            sortable: false,
            renderCell: (params) => (
              <button
                onClick={() => handleDeactivateUser(params.row.UserName)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: '#f59e0b',
                  padding: '4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(245, 158, 11, 0.1)';
                  e.target.style.color = '#d97706';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#f59e0b';
                }}
                title="Deactivate User"
              >
                ⏸
              </button>
            )
          },
          {
            field: 'delete',
            headerName: 'Delete',
            width: 70,
            sortable: false,
            renderCell: (params) => (
              <button
                onClick={() => handleDeleteUser(params.row.UserName)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: '#ef4444',
                  padding: '4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                  e.target.style.color = '#dc2626';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#ef4444';
                }}
                title="Delete User"
              >
                🗑
              </button>
            )
          }
        ]}
        pageSize={8}
        rowsPerPageOptions={[8]}
        disableSelectionOnClick
      />
    </div>
        </div>
      )}
      {activeTab === 3 && <div>Statistics admin content goes here.</div>}
    </div>
    {imagePopup.open && (
  <div
    style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}
    onClick={() => setImagePopup({ open: false, src: '' })}
  >
    <div
      style={{
        background: '#fff',
        padding: 16,
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        position: 'relative'
      }}
      onClick={e => e.stopPropagation()}
    >
      <img
        src={imagePopup.src}
        alt="Question"
        style={{ maxWidth: '80vw', maxHeight: '80vh', display: 'block', margin: '0 auto' }}
        onError={e => { e.target.onerror = null; e.target.src = notFoundImage; }}
      />
      <button
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          background: '#ef4444',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          padding: '4px 8px',
          cursor: 'pointer'
        }}
        onClick={() => setImagePopup({ open: false, src: '' })}
      >
        Close
      </button>
    </div>
  </div>
)}
    {showShapesPopup && (
  <div
    style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}
    onClick={() => setShowShapesPopup(false)}
  >
    <div
      style={{
        background: '#fff',
        padding: 16,
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        position: 'relative',
        minWidth: '320px',
        minHeight: '300px',
        height: '600px', // Set a fixed height for the popup
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={e => e.stopPropagation()}
    >
      <DndProvider backend={HTML5Backend} style={{ flex: 1, height: '100%' }}>
       
          <Shapes Data={popupChemicalData} className="shape" style={{ height: '100%' }} />
        
      </DndProvider>
      <button
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          background: '#ef4444',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          padding: '4px 8px',
          cursor: 'pointer'
        }}
        onClick={() => setShowShapesPopup(false)}
      >
        Close
      </button>
    </div>
  </div>
)}
    </div >
  );
};

export default Admin;