<script>
    export default {
        props:{
            title:{
                type: String,
                required: true,
                default: 'title here'
            }
        }
    }
</script>

<template>
    <div>
        <h1 id="titlePages"> {{ title }} </h1>
    </div>
</template>
