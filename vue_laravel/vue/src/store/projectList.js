import axios from 'axios';
import { serverURL } from '../store/server';
import { showToast } from '../store/Toast';

// Function to fetch the project list
const fetchProjects = async () => {
  try {
    const res = await axios.get(`${serverURL}/admin/allPortfolio`, {
      withCredentials: true,
    });

    if (res.status === 200 && res.data && Array.isArray(res.data.data)) {
      return res.data.data.map(project => ({
        ...project,
        firstImage: project.images && project.images.length > 0 ? project.images[0].filename : 'Image not found'
      }));
    } else if (res.data && res.data.message) {
      showToast('error', res.data.message);
      return [];
    } else {
      showToast('error', 'Unexpected response from the server');
      return [];
    }
  } catch (error) {
    if (error.response) {
      // Server responded with a status outside of the 2xx range
      if (error.response.status === 404) {
        showToast('error', 'Projects not found.');
      } else if (error.response.status === 500) {
        showToast('error', 'Internal server error. Please try again later.');
      } else {
        showToast('error', error.response.data.message || 'An error occurred while fetching the projects.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      showToast('error', 'No response from the server. Please check your network connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      showToast('error', 'Error setting up request. Please try again.');
    }
    return [];
  }
};

export { fetchProjects }
