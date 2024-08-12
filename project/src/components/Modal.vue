<script>
export default {
    props: {
        title:{
            type: String,
            required: true,
            default: 'title here'
        },
    },
    data(){
        return{
            isOpen: false
        }
    },
}
</script>

<template>
    <TransitionRoot appear :show="true" as="template">
      <Dialog as="div" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-lg transform 
                overflow-hidden rounded-2xl bg-white text-left 
                align-middle shadow-xl transition-all"
              >
                <DialogTitle as="h3" class="text-lg font-medium  p-2 text-white" style="background-color: #023E8A;">
                  {{ title }}
                </DialogTitle>
                <div class="mt-2 p-6 ">
                    <slot></slot>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
  import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  } from '@headlessui/vue'
</script>
  