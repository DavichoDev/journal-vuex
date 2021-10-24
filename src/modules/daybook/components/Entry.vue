<template>
    <div class="entry-container pointer mb-3 p-2"
         @click="$router.push({name: 'entry', params: {id: 10}})">
        <!-- Titulo -->
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">23</span>
            <span class="mx-1 fs-5">Octubre</span>
            <span class="mx-2 fw-light">2021, Sabado</span>
        </div>
        
        <div class="entry-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus praesentium eius dicta optio, assumenda consequuntur ipsum eligendi reiciendis quod? Provident corrupti ut error a! Sapiente molestias dolorem sint ea deleniti.
        </div>
    </div>
</template>

<style lang="scss" scoped>
.pointer{ 
    cursor: pointer;
}
.entry-container{
    border-bottom: 1px solid #123e50;
    transition: 0.2 all ease-in;
    &:hover {
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2 all ease-in;
    }
    .entry-description{
        font-size: 12px;
    }
}
</style>