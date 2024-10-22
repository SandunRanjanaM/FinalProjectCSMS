import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CabGallery = () => {
  const [cabs, setCabs] = useState([]);
  const [error, setError] = useState(null);

  // Fetch the cab data on component mount
  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const response = await axios.get('http://localhost:8070/uploads/cabs');
        if (response.data.success) {
          setCabs(response.data.cabs);
        } else {
          setError(response.data.message || 'Failed to load cabs.');
        }
      } catch (err) {
        setError('An error occurred while fetching cabs.');
      }
    };

    fetchCabs();
  }, []);

  // Handle image deletion
  const handleDelete = async (cabId, filePath) => {
    try {
      const response = await axios.delete(`http://localhost:8070/uploads/fileUpload/${cabId}`, {
        data: { filePath }, // Send filePath in the request body
      });

      if (response.data.success) {
        setCabs((prevCabs) => {
          // Remove the deleted image from the state
          return prevCabs.map((cab) => {
            if (cab.id === cabId) {
              return {
                ...cab,
                images: cab.images.filter((image) => image.fileName !== filePath.split('/').pop()),
              };
            }
            return cab;
          });
        });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred while deleting the image.');
    }
  };

  // Handle approval toggle
  const handleToggleApproval = async (cabId, currentStatus) => {
    try {
        const response = await axios.patch(`http://localhost:8070/uploads/toggle/${cabId}`, {
            approved: !currentStatus, // Toggle the approval status
        });

        if (response.data.success) {
            // Directly update the UI with the new approval status
            const newApprovalStatus = !currentStatus;
            setCabs((prevCabs) =>
                prevCabs.map((cab) =>
                    cab.id === cabId ? { ...cab, approved: newApprovalStatus } : cab
                )
            );
        } else {
            setError(response.data.message);
        }
    } catch (err) {
        console.error(err);
        setError('An error occurred while toggling approval status.');
    }
  };

  return (
    <div className="container mt-8">
      <h2>--Receipts--</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {cabs.length > 0 ? (
          cabs.map((cab) => (
            <div key={cab.id} className="col-md-6 mb-6">
              <div className="card">
                <div className="card-body">
                  <div>
                    {cab.images.map((image) => (
                      <div key={image.fileName} className="mb-3">
                        <img
                          src={image.url}
                          alt={image.fileName}
                          className="img-fluid"
                        />
                        <p>{/* {image.fileName} */}</p>
                        <div className="mb-3">

  <p>{/* {image.fileName} */}</p>

  {/* Button Group for actions */}
  <div className="d-inline">
    <button
      onClick={() => handleDelete(cab.id, image.fileName)}
      className="btn btn-danger btn-sm me-2"
    >
      Delete Image
    </button>

    <a
      href={image.url}
      download={image.fileName}
      className="btn btn-primary btn-sm me-2"
    >
      View
    </a>

    {/* Toggle Approval Button */}
    <button
      onClick={() => handleToggleApproval(cab.id, cab.approved)}
      className={`btn btn-sm ${cab.approved ? 'btn-warning' : 'btn-success'}`}
    >
      {cab.approved ? 'Unapprove' : 'Approve'}
    </button>
  </div>
</div>

                      
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No cabs available.</p>
        )}
      </div>
    </div>
  );
};

export default CabGallery;
