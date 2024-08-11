<script>
export default {
    data(){
        return {
            leftPainelVisible: false,
            
        }
    },
    methods:{
        setVisibleleftPainel(){
            this.leftPainelVisible = !this.leftPainelVisible;
        },
    }
}
</script>

<template>
    <header>
        <div id="headerTemplate">
            <div class="logo-header" @click="setVisibleleftPainel()">
                <img src="/logo.png" />
            </div>
            <div id="headerTools">
                <div class="user-icon">
                    <img src="/icons/usuario.png" />
                </div>
                <div class="user-login">
                    <div class="user-name">Usuário</div>
                    <div class="user-position">Administrador</div>
                </div>
                <div class="icon-loggout">
                    <img src="/icons/sair.png" />
                </div>
            </div>
        </div>
    </header>

    <div id="leftPainel" v-show="leftPainelVisible">
        <div id="containerLeftPainel">
            <div>
                <div class="title-painel">GESTÃO DE CLIENTES</div>
                <div class="link-painel">
                    <RouterLink to="/" @click="setVisibleleftPainel">
                        Lista de clientes
                    </RouterLink>
                </div>
                <div class="link-painel">
                    <a href="#">Cadastrar cliente </a>
                </div>
            </div>
            <div>
                <div class="title-painel">GESTÃO DE VENDAS</div>
                <div class="link-painel">
                    <RouterLink to="/vendas" @click="setVisibleleftPainel">
                        Lista de vendas
                    </RouterLink>
                </div>
                <div class="link-painel">
                    <a href="#">Cadastrar venda</a>
                </div>
            </div>
            <div>
                <div class="title-painel">Relatórios</div>
                <div class="link-painel">
                    <RouterLink to="/relatorios" @click="setVisibleleftPainel">
                        Relatórios
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
    <RouterView />
</template>

<script setup>
    import { RouterLink, RouterView } from 'vue-router'
</script>
