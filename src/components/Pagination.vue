<template>
<div>
    <nav class="section listing-pagination">
        <ul class="pagination-elements">
            <li class="pagination-element active"><a class="javascript;" class="pagination-link">1</a></li>
            <li class="pagination-element"><a href="javascript:;" class="pagination-link">
                2
            </a></li><li class="pagination-element"><a href="javascript:;" class="pagination-link">
                3
            </a></li><li class="pagination-element"><a href="javascript:;" class="pagination-link">
                4
            </a></li><li class="pagination-element"><a href="javascript:;" class="pagination-link">
                5
            </a></li> <!----> <!----> <li class="pagination-element direction"><a href="javascript:;" class="pagination-link"><i class="icon-angle-right"></i></a></li></ul></nav>
</div>
</template>

<script>
export default {
    name:'Sayfalar',
    data (){
        return{

        }
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