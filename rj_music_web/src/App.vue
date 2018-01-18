<template>
    <div id="app">
        <Layout class="rj-lay">
            <Header class="rj-header">
                <rj-header></rj-header>
            </Header>
            <Content>
                <router-view></router-view>
            </Content>
            <Footer class="rj-footer">
                <rj-footer></rj-footer>
            </Footer>
        </Layout>
    </div>
</template>

<script>
import header from './shared/common-module/header.vue';
import footer from './shared/common-module/footer.vue';

export default {
    name: 'App',
    components: {
        'rj-header': header,
        'rj-footer': footer
    }
}
</script>

<style lang="stylus">
    #app {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        text-align: center;
        .rj-header {
            position: relative;
            z-index: 1000;
            box-sizing: border-box;
            background: #242424;
            border-bottom: 1px solid #000;
        }
        .rj-lay {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
        .rj-footer {
            height: 53px;
            position relative;
            zoom: 1;
            background: url("./assets/playbar.png") repeat-x 0 0;
        }
    }

</style>
