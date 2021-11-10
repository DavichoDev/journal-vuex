<template>
    <template v-if="entry">
        <div class="entry-title p-2 d-flex justify-content-between">
            <div>
                <span class="text-success fs-3 fw-bold">{{ day }}</span>
                <span class="mx-1 fs-3">{{ month }}</span>
                <span class="mx-2 fs-4 fw-light">{{ yearDate }}</span>
            </div>
            <div>
                
                <input 
                    type="file"
                    @change="onSelectedImage"
                    ref="imageSelector"
                    v-show="false"
                    accept="image/png, image/jpeg"
                >

                <button
                    @click="onDeleteEntry" 
                    class="btn btn-danger mx-2">
                    Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button 
                    @click="onSelectImage"
                    class="btn btn-primary mx-2">
                    Subir foto
                    <i class="fa fa-upload "></i>
                </button>
            </div>
        </div>
        
        <hr>
        <div class="d-flex flex-column px-3 h-75">
            <textarea
                v-model="entry.text"
                placeholder="¿Qué sucedio hoy?"
            ></textarea>
        </div>
    </template>

    <Fab 
         @on:click="onSaveEntry"
         :icon="'fa-save'"
    />

    <img
        v-if="entry.picture && !localImage" 
        :src="entry.picture" 
        alt="entry-picture"
        class="img-thumbnail"
    />

    <img
        v-if="localImage" 
        :src="localImage" 
        alt="entry-picture"
        class="img-thumbnail"
    />

</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import uploadImage from '../helpers/uploadImage';

import getDayMonthYear from '../helpers/getDayMonthYear';

export default {
    name: 'EntryView',
    props:{
        id: {
            type: String,
            required: true
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    data(){
        return {
            entry: {},
            localImage: null,
            imgFile: null
        }
    },
    computed: {
        ...mapGetters('journal',['getEntryById']),
        day(){
            const { day } = getDayMonthYear( this.entry.date )
            return day
        },
        month(){
            const { month } = getDayMonthYear( this.entry.date )
            return month
        },
        yearDate(){
            const { yearDate } = getDayMonthYear( this.entry.date )
            return yearDate
        }
    },
    methods: {
        ...mapActions('journal', ['updateEntries', 'createEntry', 'deleteEntry']),
        loadEntry () {
            let entry;
            if (this.id === 'new') {
                entry = {
                    text: '',
                    date: new Date().getTime()
                }
            } else {
                entry = this.getEntryById(this.id)
                if ( !entry ) return this.$router.push({name: 'no-entry'})
            }
            this.entry = entry
        },
        async onSaveEntry(){

            new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false,
            })
            Swal.showLoading()

            const picture = await uploadImage(this.imgFile)

            this.entry.picture = picture

            if ( this.entry.id ) {
                // Actualizar
                await this.updateEntries(this.entry)
            } else {
                // Crear una nueva entrada
                const id = await this.createEntry(this.entry)
                this.$router.push({name: 'entry', params: {id}})
            }
            this.imgFile = null
            Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')

        },
        async onDeleteEntry(){
            const { isConfirmed } = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Una vez borrado, no se podrá recuperar.',
                showDenyButton: true,
                confirmButtonText: 'Si, estoy seguro'
            })

            if (isConfirmed) {
                Swal.fire({
                    title: 'Espere por favor',
                    allowOutsideClick: false
                })
                Swal.showLoading()
                await this.deleteEntry(this.entry.id)
                this.$router.push({name: 'no-entry'})

                Swal.fire('Eliminado', '', 'success')
            }
        },
        onSelectedImage({target}){
            const file = target.files[0]
            if (!file) {
                this.localImage = null
                this.imgFile = null
                return
            }
            // imgFile para enviar
            this.imgFile = file
            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL( file )
        },
        onSelectImage(){
            this.$refs.imageSelector.click()
        }
    },
    created(){
        this.loadEntry()
    },
    watch: {
        id(){
            this.loadEntry()
        }
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