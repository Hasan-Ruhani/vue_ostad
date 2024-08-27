<script setup>

</script>
<template>
    <!-- Navbar & Hero Start -->
    <div class="container-fluid position-relative p-0">
            <nav class="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                <a href="" class="navbar-brand p-0">
                    <h1 class="text-primary"><i class="fas fa-hand-holding-water me-3"></i>Acuas</h1>
                    <!-- <img src="img/logo.png" alt="Logo"> -->
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="fa fa-bars"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto py-0">
                        <router-link to="/" class="nav-item nav-link">Home</router-link>
                        <router-link to="about" class="nav-item nav-link">About</router-link>
                        <router-link to="service" class="nav-item nav-link">Service</router-link>
                        <router-link to="blog" class="nav-item nav-link">Blog</router-link>

                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div class="dropdown-menu m-0">
                                <router-link to="feature" class="dropdown-item">Our Feature</router-link>
                                <router-link to="product" class="dropdown-item">Our Product</router-link>
                                <router-link to="team" class="dropdown-item">Our Team</router-link>
                                <router-link to="testimonial" class="dropdown-item">Our Testimonial</router-link>
                                <router-link to="error" class="dropdown-item">404 Page</router-link>
                            </div>
                        </div>
                        <router-link to="contact" class="nav-item nav-link">Contact</router-link>
                    </div>
                    <div class="d-none d-xl-flex me-3">
                        <div class="d-flex flex-column pe-3 border-end border-primary">
                            <span class="text-body">Get Free Delivery</span>
                            <a href="tel:+4733378901"><span class="text-primary">Free: + 0123 456 7890</span></a>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-md-square d-flex flex-shrink-0 mb-3 mb-lg-0 rounded-circle me-3" data-bs-toggle="modal" data-bs-target="#searchModal"><i class="fas fa-search"></i></button>
                    <a href="" class="btn btn-primary rounded-pill d-inline-flex flex-shrink-0 py-2 px-4">Order Now</a>
                </div>
            </nav>
        </div>
</template>