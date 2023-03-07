<script lang="ts" setup>
import { h, inject } from 'vue';
import FormWithCompositionApi from './FormWithCompositionApi.vue';
import FormWithOptionsApi from './FormWithOptionsApi.vue';

const { confirm } = inject('modal');

function openFormWithCompositionApi() {
    confirm('FormWithCompositionApi', () => h(FormWithCompositionApi), {
        confirm(e: Event, button: any, modal: any, resolve: Function) {
            button.label = 'Loading...';
            button.disabled = true;
            // this doesn't disable the button

            modal.$refs.content.submit().then(
                () => setTimeout(() => {
                    resolve(true);
                }, 1000)
            ); 
        }
    }).then((status: boolean) => {
        console.log(status ? 'confirmed!' : 'canceled!');
    });
}

function openFormWithOptionsApi() {
    confirm('Some Title Here', () => h(FormWithOptionsApi), {
        buttons: [{
            label: 'Confirm',
            onClick(e: any, button: any, modal: any, resolve: any) {
                button.label = 'Loading...';
                button.disabled = true;

                modal.$refs.content.submit().then(
                    () => setTimeout(() => {
                        resolve(true);
                    }, 1000)
                );
            }
        }]
    }).then((status: boolean) => {
        console.log(status ? 'confirmed!' : 'canceled!');
    });
}

function openModalWithCustomButtons() {
    confirm('Some Title Here', () => h('form', {
        onSubmit(e: any) {
            e.preventDefault();
        }
    }, ['some content']), {
        buttons: [{
            label: 'test',
            onClick(e: any, button: any, modal: any, resolve: Function) {
                button.label = 'Loading...';
                button.disabled = true;

                setTimeout(() => {
                    resolve(true);
                }, 1000);
            }
        }, {
            label: 'test2',
            onClick(e: any, button: any, modal: any, resolve: Function) {
                button.label = 'Loading...';
                button.disabled = true;
                
                setTimeout(() => {
                    resolve(true);
                }, 1000);
            }
        }]
    });
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <div>
            <button
                class="btn btn-primary"
                @click="openFormWithCompositionApi">
                Open Form with Composition API
            </button>
        </div>
        <div>
            <button
                class="btn btn-primary"
                @click="openFormWithOptionsApi">
                Open Form with Options API
            </button>
        </div>
        <div>
            <button
                class="btn btn-primary"
                @click="openModalWithCustomButtons">
                Open Modal with Custom Buttons
            </button>
        </div>
    </div>
</template>