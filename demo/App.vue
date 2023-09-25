<script lang="ts" setup>
import { h, inject } from 'vue';
import { modals } from '../src/ModalPlugin.js';
import ConfirmationForm, { type User } from './ConfirmationForm.vue';

const alert = inject(modals.alert);
const confirm = inject(modals.confirm);

function wait(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

function log(...args: any[]) {
    console.log(...args);
}

const test = confirm?.('test', 'test');

async function showConfirmationForm() {
    return confirm?.<User>('Confirmation Form', () => h(ConfirmationForm), {
        confirm(_, button, content: { submit: () => Promise<User> }) {
            button.disabled = true;
            
            return content.submit();
        }
    });
}

async function showCustomButtons() {
    return confirm?.<'yes'|'no'>('Custom Buttons', 'This confirmation as 3 options.', {
        buttons: [{
            label: 'Yes',
            async onClick(_, button) {
                button.label = 'Loading...';
                button.disabled = true;

                await wait(1000);

                return 'yes';
            }
        },{
            label: 'No',
            variant: 'secondary',
            async onClick(_, button) {
                button.label = 'Loading...';
                button.disabled = true;

                await wait(1000);

                return 'no';
            }
        },{
            label: 'Cancel',
            variant: 'secondary',
            outline: true,
            async onClick(_, button) {
                button.label = 'Loading...';
                button.disabled = true;

                await wait(1000);

                return false;
            }
        }]
    });
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <h1 class="text-4xl mb-2">
            Modal
        </h1>

        <div class="flex flex-col gap-4">
            <h3 class="text-2xl">
                Alerts
            </h3>

            <p>
                An alert returns a boolean promise, always resolving to true once it has closed. Check the console.
            </p>
    
            <div>
                <button
                    class="btn btn-primary"
                    @click="alert?.('Hello World!', 'This is an alert. You may dismiss it.').then(value => log('Alert Resolved!', value))">
                    Show Alert
                </button>
            </div>
        </div>

        <div class="flex flex-col gap-4">
            <h3 class="text-2xl">
                Confirmations
            </h3>

            <p>
                An confirmation returns a boolean promise, resolve to true if confirmed, otherwise it returns false. Check the console.
            </p>

            <div>
                <button
                    class="btn btn-primary"
                    @click="confirm?.('Confirm Me!', 'Are you sure you want to confirm?').then(value => log('Confirm Resolved!', value))">
                    Show Confirmation
                </button>
            </div>
        </div>

        <div class="flex flex-col gap-4">
            <h3 class="text-2xl">
                Confirmation Form
            </h3>

            <p>
                Use a confirmation modal after submitting a form.
            </p>

            <div>
                <button
                    class="btn btn-primary"
                    @click="showConfirmationForm().then(value => log('Confirmation Form Resolved!', value))">
                    Show Form
                </button>
            </div>
        </div>

        <div class="flex flex-col gap-4">
            <h3 class="text-2xl">
                Custom Buttons
            </h3>

            <p>
                Use a confirmation modal after submitting a form.
            </p>

            <div>
                <button
                    class="btn btn-primary"
                    @click="showCustomButtons().then(value => log('Custom Buttons Resolved!', value))">
                    Show Form
                </button>
            </div>
        </div>
    </div>
</template>