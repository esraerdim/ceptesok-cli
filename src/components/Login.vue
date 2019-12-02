<template>
<div>
<div>
   <header><headers/></header>
    <div>
        <nav class="section breadcrumbs bg-white">
            <div class="wrapper breadcrumbs-wrap">
                <div class="breadcrumbs-container">
                    <ul class="breadcrumbs-list">
                        <li><a href="https://www.ceptesok.com">Ana Sayfa</a></li>
                        <li><a href="/uye">Üyelik</a></li>
                        <li><span>Giriş</span></li>
                    </ul>
                </div>
            </div>
        </nav>
        <main class="section login page-whitebg">
            <div class="wrapper">
                <div class="section login-content">
                    <div class="login-right">
                        <div id="member-login-embed" class="login-form login clickshow-subject noanim grid-container narrow-vertical inputform enable show">
                            <div class="grid-row">
                                <div class="grid-col nogap-top form-alternatives">
                                    <div class="col-xs-12 padding-reset clickshow notoggle" data-subject="member-register-embed" data-clickshow-group="member-sections-embed">
                                        <div class="col-xs-6 xs-pl0 xs-pb0"><span class="btn btnFaceBook flexRow xs-textleft" style="background-color: blue; color: white;"><img src="../img/facebook.svg" alt="">
            Facebook ile  giriş yap.
        </span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="grid-row">
                                <div class="grid-col nogap-t"> </div>
                            </div>
                            <div class="grid-row">
                                <div class="grid-col">
                                    <div class="inputwrap type-text">
                                        <input type="text" name="phone" autocomplete="tel-national" maxlength="11" placeholder="Cep Telefonu">
                                    </div>
                                </div>
                            </div>
                            <div class="grid-row">
                                <div class="grid-col">
                                    <div class="inputwrap type-password">
                                        <input type="password" name="password" autocomplete="current-password" placeholder="Parola">
                                        <button type="button" class="password-peek"></button>
                                    </div>
                                </div>
                            </div>
                            <div class="grid-row">
                                <div class="grid-col gap-top-high">
                                    <div class="checkwrap type-checkbox">
                                        <input type="checkbox" id="input_dummy_4">
                                        <label for="input_dummy_4"><span></span> Beni hatırla</label>
                                    </div> <a onclick="checkRegisterModalEnabled()" data-modal="modal_passwordrecovery" class="form-innerlink fright modaltrigger">Şifrenizi unuttunuz mu?</a></div>
                            </div>
                            <div class="grid-row">
                                <div class="grid-col gap-top-high">
                                    <button class="btn green block">
                                        Giriş yap
                                    </button>
                                </div>
                            </div>
                            <div class="grid-row">
                                <div class="grid-col">
                                    <div class="form-seperator"></div>
                                </div>
                            </div>
                            <div class="grid-row">
                                <div class="grid-col nogap-top form-alternatives"><span class="alternatives-title">Hesabınız yok mu?</span>
                                    <button data-subject="member-register-embed" data-clickshow-group="member-sections-embed" class="clickshow notoggle">Şimdi Kayıt Ol</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="login-left">
                        <a href="/hazir-listeler"><img src="../img/login-banner.jpg" class="login-banner"></a>
                    </div>
                </div>
            </div>
        </main>
    </div>
<altkisim/>
</div>
</div>
</template>

<script>
import Altkisim  from './Altkisim.vue'
import headers from './Headers.vue'

export default {
    name: 'Login',
    components:{
        headers,
        Altkisim,
    },
    data () {
    return {}
    }
 }
</script>

<style>

</style>