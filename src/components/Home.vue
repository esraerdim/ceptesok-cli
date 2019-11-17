<template>
<div>
  <header><headers/></header>
     <Internettenode/>
     <SSlider/>
     <dortlu/>
     <kacirma/>
     <hazir-list/>
     <nearest/>
     <a href="#"><img alt="Yukarı Çık" class="yukarikaydir" src="../img/yc.png" style="display: block;"></a>
     <altkisim/>
</div>
</template>
<script>
import headers from './Headers.vue'
import Dortlu from './Dortlu.vue'
import Internettenode  from './Inter.vue'
import SSlider  from './SSlider.vue'
import Kacirma  from './Kacirma.vue'
import HazirList  from './HazirList.vue'
import Altkisim  from './Altkisim.vue'
import Nearest  from './Nearest.vue'

export default {
   name:'Home',
   components:{
       headers,
       Dortlu,
       Internettenode,
       SSlider,
       Kacirma,
       HazirList,
       Altkisim,
       Nearest,
   }
}
</script>