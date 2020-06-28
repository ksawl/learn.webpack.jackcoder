<template>
    <section>
        <div class="container">
            <h3>Vue Example Component <br> {{ message }}</h3>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            message: null,
        };
    },
    created() {
        this.message = this.$store.getters.getMessage;
    },
};
</script>

<style lang="scss" scoped>
h3 {
    text-transform: uppercase;
    font-size: 3rem;
    color: darkblue;
}
</style>
