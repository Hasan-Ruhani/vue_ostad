<script setup>
    import { useForm, usePage, Head } from '@inertiajs/vue3';
    import AppNavBar from '../Component/AppNavBar.vue';
    import Index from './Index.vue';

    const page = usePage();

    const form = useForm({
        first_name: "Hasan",
        last_name: "Khan",
        email: "a@gmail.com"
    });

    function submit(){
        form.post('/PostBackRequest', {
            preserveScroll: true,
            onSuccess: ()=>{
                alert(page.props.flash.message);
                alert(page.props.flash.status);
                alert(JSON.stringify(page.props.flash.data));
                form.reset();
            }
        });
    }

</script>

<template>
    <Head>
        <title>Page-4</title>
    </Head>

    <AppNavBar/>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <form @submit.prevent="submit">
                    <label class="form-lable">First Name</label>
                    <input type="text" class="form-control mb-2" id="first_name" v-model="form.first_name">

                    <label class="form-lable">Last Name</label>
                    <input type="text" class="form-control mb-2" id="last_name" v-model="form.last_name">

                    <label class="form-lable">Email</label>
                    <input type="text" class="form-control mb-2" id="email" v-model="form.email">

                    <button type="submit" class="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>