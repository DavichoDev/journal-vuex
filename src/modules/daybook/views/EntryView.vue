<template>
    <div class="entry-title p-2 d-flex justify-content-between">

        <div>
            <span class="text-success fs-3 fw-bold">23</span>
            <span class="mx-1 fs-3">Octubre</span>
            <span class="mx-2 fs-4 fw-light">2021, Sabado</span>
        </div>

        <div>
            <button class="btn btn-danger mx-2">
                Borrar
                <i class="fa fa-trash-alt"></i>
            </button>

            <button class="btn btn-primary mx-2">
                Subir foto
                <i class="fa fa-upload "></i>
            </button>
        </div>

    </div>
    
    <hr>

    <div class="d-flex flex-column px-3 h-75">
        <textarea 
            placeholder="¿Qué sucedio hoy?"
        ></textarea>
    </div>

    <Fab :icon="'fa-save'" />

    <img src="data:image/png;base64,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" 
         alt="entry-picture"
         class="img-thumbnail"
    >

</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    }

}
</script>

<style lang="scss" scoped>

textarea {
    font-size: 20px;
    border: none;
    height: 100%;
    resize: none;

    &:focus{
        outline: none;
    }
}

img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}

.entry-title{

}

</style>