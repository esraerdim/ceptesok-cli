<template>
<div>
    <nav class="section listing-pagination">
        <ul class="pagination-elements">
            <li class="pagination-element active"><a href="#" class="pagination-link">1</a></li>
            <li class="pagination-element"><a href="#;" class="pagination-link">2</a></li>
                <li class="pagination-element"><a href="#;" class="pagination-link">3</a></li>
                <li class="pagination-element"><a href="/page/4" class="pagination-link">4</a></li>
                <li class="pagination-element"><router-link :to="{ name: 'Et', query: { page:5 }}" class="pagination-link">5 </router-link></li>
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