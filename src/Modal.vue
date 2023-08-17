<script setup lang="ts" generic="T = boolean">
import { ActivityIndicator, Pulse } from '@vue-interface/activity-indicator';
import { Btn } from '@vue-interface/btn';
import { computed, h, onMounted, reactive, ref, watch, type Component, type VNode } from 'vue';

const props = withDefaults(defineProps<ModalProps<T>>(), {
    backdrop: true,
    buttons: undefined,
    cancel: () => Promise.resolve(),
    cancelButton: undefined,
    confirm: () => Promise.resolve(true as T),
    confirmButton: undefined,
    indicator: () => h(ActivityIndicator, {
        type: Pulse,
        center: true,
        minHeight: 200
    }),
    resolve: undefined,
    closeable: true,
    footer: true,
    show: false,
    title: undefined,
    type: undefined
});


const $el = ref<HTMLElement>();
const $backdrop = ref<HTMLElement>();
const $dialog = ref<HTMLElement>();
const $close = ref<HTMLElement>();
const $body = ref<HTMLElement>();
const content = ref<unknown>();
const $footer = ref<HTMLElement>();

const isClosing = ref(false);
const isShowing = ref(false);
const isDisplaying = ref(false);

const emit = defineEmits<{
    (e: 'closed', event: Event, resolved: Response<T>): void
    (e: 'close', event: Event, el: HTMLElement|undefined, handler: Function): void
    (e: 'open', event: Event, handler: Function): void
    (e: 'opened', event: Event): void
}>();

function focus() {
    $el.value?.focus();
}

async function close(response: Response<T>, e?: Event) {
    return new Promise<Response<T>>(resolve => {
        const event = e || new Event('close', {
            cancelable: true
        });

        function handler() {
            isClosing.value = true;
            isShowing.value = false;
            
            window.setTimeout(() => {
                isClosing.value = false;
                isDisplaying.value = false;
                
                emit('closed', event, response);

                resolve(response);
            }, 250);
        };
        
        emit('close', event, $close.value, handler);

        if(!event.defaultPrevented) {
            handler();
        }
    }).then(response => {
        props.resolve?.(response);

        return response;
    });
}

function open() {
    return new Promise<void>(resolve => {
        const event = new Event('close', {
            cancelable: true
        });

        function handler() {
            isDisplaying.value = true;

            window.setTimeout(() => {
                isShowing.value = true;
                window.setTimeout(() => {
                    emit('opened', event);

                    resolve();
                }, 500);
            });
        };

        emit('open', event, handler);

        if(!event.defaultPrevented) {
            handler();
        }
    });
}

function toggle() {
    if(!isShowing.value) {
        return open();
    }
    else {
        return close(false);
    }
}

defineExpose({
    open,
    close,
    focus,
    toggle,
    $el,
    content
});

const triggerableClasses = computed(() => {
    return {
        show: isShowing.value
    };
});

const computedCancelButton = computed(() => {
    const button: Button<T> = reactive(props.cancelButton ?? {
        variant: 'secondary',
        label: 'Cancel',
        name: 'confirm',
        async onClick(e: Event) {
            return await props.cancel(e).then(() => close(false, e));
        }
    });

    return button;
});

const computedConfirmButton = computed(() => {
    const button: Button<T> = reactive(props.confirmButton ?? {
        variant: 'primary',
        label: 'Confirm',
        name: 'confirm',
        async onClick(e) {
            return await props.confirm(e, button, content.value).then((response: Response<T>) => close(response, e));
        }
    });

    return button;
});

const currentButtons = computed(() => {
    if(Array.isArray(props.buttons)) {
        return props.buttons.map((button) => reactive(button));
    }
    else if(props.type === 'alert') {
        return [computedConfirmButton.value];
    }
    else if(props.type === 'confirm') {
        return [
            computedConfirmButton.value,
            computedCancelButton.value
        ];
    }

    return [];
});

watch(isShowing, () => {
    document.querySelector('body')?.classList[isShowing.value ? 'add' : 'remove']('modal-open');
});

onMounted(() => {
    if(props.show) {
        open();
    }
});
</script>

<script lang="ts">
export type Response<T> = false | T;
export type CancelFunction = (e: Event) => Promise<void>;
export type ConfirmFunction<T> = (e: Event, button: Omit<Button<T>, 'onClick'>, content: any) => Promise<Response<T>>;
export type CloseFunction<T> = (status: boolean, e?: Event) => Promise<Response<T>>
export type ClickCallback<T> = (e: Event, button: Omit<Button<T>, 'onClick'>, content: any) => Promise<Response<T>>;

export interface Button<T> {
    class?: string,
    disabled?: boolean,
    name?: string,
    label?: string,
    size?: string,
    outline?: boolean,
    variant?: string,
    onClick?: ClickCallback<T>
}

export type ModalProps<T> = {
    backdrop?: boolean,
    buttons?: Button<T>[]
    cancel?: CancelFunction,
    cancelButton?: Button<T>,
    confirm?: ConfirmFunction<T>,
    confirmButton?: Button<T>,
    center?: boolean,
    closeable?: boolean,
    footer?: boolean,
    indicator?: Component|VNode,
    show?: boolean,
    resolve?: Function,
    title?: string,
    type?: 'alert'|'confirm'
}
</script>

<template>
    <div
        ref="$el"
        class="modal fade"
        :class="{...triggerableClasses}"
        :style="{display: isDisplaying ? 'block' : 'none'}"
        tabindex="-1"
        @keydown.esc="close(false, $event)">
        <slot name="backdrop">
            <div
                v-if="backdrop && isDisplaying" 
                ref="$backdrop"
                class="modal-backdrop fade"
                :class="{'show': isShowing}"
                @click="closeable && close" />
        </slot>
        
        <div
            ref="$dialog"
            class="modal-dialog"
            :class="{'modal-dialog-centered': center}">
            <div class="modal-content">
                <slot name="header">
                    <div class="modal-header">
                        <slot name="title">
                            <h3
                                v-if="title"
                                class="modal-title">
                                {{ title }}
                            </h3>
                        </slot>

                        <slot name="close-button">
                            <button
                                v-if="closeable"
                                ref="$close"
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                :disabled="isClosing"
                                @click="close(false, $event)">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </slot>
                    </div>
                </slot>

                <slot
                    ref="$body"
                    name="body">
                    <Suspense>
                        <div>
                            <div class="modal-body">
                                <slot ref="content" />
                            </div>
                            <slot
                                v-if="footer"
                                name="footer"
                                :close="close">
                                <div
                                    v-if="currentButtons.length"
                                    ref="$footer"
                                    class="modal-footer">
                                    <div class="modal-footer-buttons">
                                        <template v-if="currentButtons.length">
                                            <Btn
                                                v-for="(button, i) in currentButtons"
                                                :key="`btn-${i}`"
                                                :class="button.class"
                                                :disabled="button.disabled"
                                                :name="button.name"
                                                :label="button.label"
                                                :outline="button.outline"
                                                :size="button.size"
                                                :variant="button.variant"
                                                @click="button.onClick?.($event, button, content).then(response => close(response, $event))" />
                                        </template>
                                    </div>
                                </div>
                            </slot>
                        </div>
                        <template #fallback>
                            <Component :is="indicator" />
                        </template>
                    </Suspense>
                </slot>
            </div>
        </div>
    </div>
</template>

<style>
.modal-footer-buttons {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    grid-gap: .5rem;
    align-items: center;
}
</style>