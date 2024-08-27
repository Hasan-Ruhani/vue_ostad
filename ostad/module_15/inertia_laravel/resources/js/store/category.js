

    import { ref } from 'vue';
    import axios from 'axios';

    const categories = ref([]); // Reactive reference for categories

    const fetchCategories = () => {
    axios.get('admin/allCategory')
        .then(response => {
        if(response.data.status === 'success'){
            categories.value = response.data.data;
        }
        })
        .catch(error => {
        showToast('error', 'Category server problem!!');
        });
    };

    

    export { categories, fetchCategories };
