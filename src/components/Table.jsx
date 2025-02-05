import React, { useState } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const Table = () => {
    const [rowData, setRowData] = useState([
        { id: 997, ruleName: '2DS - Trace Changes', active: 'Y', type: 'Match', subType: '2DS - Trace Changes', domain: '', impacted: 0, favourite: 'N', scheduled: 'Y', lastScheduledDate: '01-May-2024 01:15 PM', alert: 'Y' },
        { id: 996, ruleName: 'Trace Changes', active: 'Y', type: 'Match', subType: '2DS - Trace Changes', domain: '', impacted: 0, favourite: 'N', scheduled: 'N', lastScheduledDate: '01-May-2024 01:15 PM', alert: 'N' },
        { id: 986, ruleName: 'File Monitor', active: 'Y', type: 'Match', subType: '1DS - File Monitor', domain: '', impacted: 57994, favourite: 'N', scheduled: 'Y', lastScheduledDate: '01-May-2024 01:15 PM', alert: 'Y' },
        { id: 985, ruleName: 'testreve1', active: 'Y', type: 'Match', subType: '1DS - File Monitor', domain: '', impacted: 13773, favourite: 'N', scheduled: 'N', lastScheduledDate: '01-May-2024 01:15 PM', alert: 'N' }
    ]);

    const [formData, setFormData] = useState({
        id: '',
        ruleName: '',
        active: '',
        type: '',
        subType: '',
        domain: '',
        impacted: '',
        favourite: '',
        scheduled: '',
        lastScheduledDate: '',
        alert: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const onSelectionChanged = (event) => {
        const selectedRow = event.api.getSelectedRows()[0];
        if (selectedRow) {
            setFormData(selectedRow);
            setIsModalOpen(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        const updatedData = rowData.map((row) =>
            row.id === formData.id ? formData : row
        );
        setRowData(updatedData);
        setIsModalOpen(false);
        console.log('Saved/Updated Data:', formData);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="ag-theme-alpine" style={{ height: 300, width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={[
                        { field: 'id', headerName: 'ID', sortable: true, filter: true, checkboxSelection: true },
                        { field: 'ruleName', headerName: 'Rule Name', sortable: true, filter: true },
                        { field: 'active', headerName: 'Active Status', sortable: true, filter: true },
                        { field: 'type', headerName: 'Type', sortable: true, filter: true },
                        { field: 'subType', headerName: 'Sub Type', sortable: true, filter: true },
                        { field: 'domain', headerName: 'Domain', sortable: true, filter: true },
                        { field: 'impacted', headerName: 'Impacted Count', sortable: true, filter: true },
                        { field: 'favourite', headerName: 'Favourite', sortable: true, filter: true },
                        { field: 'scheduled', headerName: 'Scheduled', sortable: true, filter: true },
                        { field: 'lastScheduledDate', headerName: 'Last Scheduled Date', sortable: true, filter: true },
                        { field: 'alert', headerName: 'Alert', sortable: true, filter: true }
                    ]}
                    rowSelection="single"
                    onSelectionChanged={onSelectionChanged}
                />
            </div>


            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-1/2">
                        <h2 className="text-xl mb-4">Edit Rule</h2>
                        <form>
                            <div className="grid grid-cols-2 gap-4">
                                <input name="ruleName" value={formData.ruleName} onChange={handleChange} placeholder="Rule Name" className="border p-2" />
                                <input name="active" value={formData.active} onChange={handleChange} placeholder="Active" className="border p-2" />
                                <input name="type" value={formData.type} onChange={handleChange} placeholder="Type" className="border p-2" />
                                <input name="subType" value={formData.subType} onChange={handleChange} placeholder="Sub Type" className="border p-2" />
                                <input name="domain" value={formData.domain} onChange={handleChange} placeholder="Domain" className="border p-2" />
                                <input name="impacted" value={formData.impacted} onChange={handleChange} placeholder="Impacted Count" className="border p-2" />
                                <input name="favourite" value={formData.favourite} onChange={handleChange} placeholder="Favourite" className="border p-2" />
                                <input name="scheduled" value={formData.scheduled} onChange={handleChange} placeholder="Scheduled" className="border p-2" />
                                <input name="lastScheduledDate" value={formData.lastScheduledDate} onChange={handleChange} placeholder="Last Scheduled Date" className="border p-2" />
                                <input name="alert" value={formData.alert} onChange={handleChange} placeholder="Alert" className="border p-2" />
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button type="button" onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
                                    Save
                                </button>
                                <button type="button" onClick={handleClose} className="bg-gray-500 text-white py-2 px-4 rounded">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;
