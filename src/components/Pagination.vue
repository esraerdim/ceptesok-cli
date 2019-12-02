<template>
<div>
    <nav class="section listing-pagination">
        <ul class="pagination-elements">
            <li class="pagination-element active"><router-link :to="{ path: `${this.$route.fullPath}`, query: { page:1 }}" class="pagination-link">1</router-link></li>
            <li class="pagination-element"><router-link :to="{ path: `${this.$route.fullPath}`, query: { page:2 }}" class="pagination-link">2</router-link></li>
                <li class="pagination-element"><router-link :to="{ path: `${this.$route.fullPath}`, query: { page:3 }}" class="pagination-link">3</router-link></li>
                <li class="pagination-element"><router-link :to="{ path: `${this.$route.fullPath}`, query: { page:4 }}" class="pagination-link">4</router-link></li>
                <li class="pagination-element"><router-link :to="{ path: `${this.$route.fullPath}`, query: { page:5 }}" class="pagination-link">5 </router-link></li>
        </ul>
    </nav>
</div>
</template>

<script>
export default {
    name:'Sayfalar',
    data (){
        return{}
    }
}
</script>

<style>
.section.listing-pagination .pagination-elements {
    display: inline-block;
    vertical-align: middle;
    line-height: 1.28571429rem;
}

</style>