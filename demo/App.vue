<script lang="ts" setup>
import { h, inject } from 'vue';
import FormWithCompositionApi from './FormWithCompositionApi.vue';
import FormWithOptionsApi from './FormWithOptionsApi.vue';

const { confirm } = inject('modal');

function openFormWithCompositionApi() {
    confirm('FormWithCompositionApi', () => h(FormWithCompositionApi));
}

function openFormWithOptionsApi() {
    confirm('FormWithOptionsApi', () => FormWithOptionsApi);
}

function openModalWithCustomButtons() {
    confirm('Some Title Here', () => FormWithOptionsApi, {
        buttons: [{
            label: 'test',
            onClick(e, button, modal, resolve) {
                button.label = 'Loading...';
                button.disabled = true;

                modal.$refs.content.submit().then(
                    () => setTimeout(() => {
                        resolve(true);
                    }, 1000)
                );
            }
        }]
    });
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <div>
            <button class="btn btn-primary" @click="openFormWithCompositionApi">
                Open Form with Composition API
            </button>
        </div>
        <div>
            <button class="btn btn-primary" @click="openFormWithOptionsApi">
                Open Form with Options API
            </button>
        </div>
        <div>
            <button class="btn btn-primary" @click="openModalWithCustomButtons">
                Open Modal with Custom Buttons
            </button>
        </div>
    </div>
</template>