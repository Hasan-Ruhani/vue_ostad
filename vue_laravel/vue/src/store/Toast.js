// src/utils/toast.js
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const options = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    closeOnClick: true,
    type: 'default'
};

 function showToast(type, message) {
    if (type === 'success') {
        toast.success(message, options);
    } else if (type === 'error') {
        toast.error(message, options);
    } else if (type === 'warning') {
        toast.error(message, options);
    }
}

export {showToast};
