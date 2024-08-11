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
                GESTÃO DE CLIENTES
                <ul>
                    <li>
                        <RouterLink to="/" @click="setVisibleleftPainel">
                            lista de clientes
                        </RouterLink>
                    </li>
                    <li>Cadastrar cliente</li>
                </ul>
            </div>
            <div>
                GESTÃO DE Vendas
                <ul>
                    <li>
                        <RouterLink to="/vendas" @click="setVisibleleftPainel">
                            lista de vendas
                        </RouterLink>
                    </li>
                    <li>Cadastrar venda</li>
                </ul>
            </div>
            <div>
                Relatórios
                <ul>
                    <li>
                        <RouterLink to="/relatorios" @click="setVisibleleftPainel">
                            Relatórios
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <RouterView />
</template>

<script setup>
    import { RouterLink, RouterView } from 'vue-router'
</script>
