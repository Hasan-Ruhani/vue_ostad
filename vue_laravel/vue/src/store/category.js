
    import axios from 'axios';
    import { ref } from 'vue';
    import { serverURL } from './server';
    import { showToast } from './Toast';

    const categories = ref([])

    const fetchCategories = () => {
        axios.get(`${serverURL}/admin/allCategory`, {
            withCredentials: true
        })
        .then (res => {
            if(res.data.status === 'success') {
                categories.value = res.data.data
            }
        })
        .catch(error => {
            showToast('error', 'Category server problem!!')
        });
    }

    export { categories, fetchCategories }
    

    


