<template>
  <el-row justify="center">
    <el-card class="box-card" v-for="(player, id) of getEditPlayers" :key="id" v-show="idxVisible == id">
      <el-row>
        <el-col :span="24">
          <h3>{{player.nome}}</h3>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <img crossorigin="anonymous" src="https://web.whatsapp.com/pp?e=https%3A%2F%2Fpps.whatsapp.net%2Fv%2Ft61.24694-24%2F258689832_483788816809845_3017481807239871222_n.jpg%3Fccb%3D11-4%26oh%3D4b03421dce221c05d20145b03bd0cbbd%26oe%3D6223AC7C&t=l&u=5516991155146%40c.us&i=1645754983&n=jEWlil8jwh9NnnOBSS12olkm2kGxP44frG5%2BUHhF%2BW0%3D" alt="" class="_2hH_e i0jNr" style="visibility: visible;">
          <el-image
            :src="player.foto"
            :fit="contain"
          >
          <template #error>
            <div class="image-slot">
              Sem foto
            </div>
          </template>
          </el-image>
        </el-col>
      </el-row>
      <el-slider :min="1" :max="10" v-model="points"></el-slider>
    <el-divider></el-divider>
      <el-row>
        <el-col :span="8">
          <el-button size="large" :icon="Share"  @click="handlePularClick" type="primary">
            Pular
          </el-button>
        </el-col>
        <el-col :offset="9" :span="6">
          <el-button size="large" type="success">Confirmar</el-button>
        </el-col>
      </el-row>
    </el-card>
  </el-row>
</template>

<script>
import {  mapActions, mapState } from 'pinia'
import { store } from '@/stores'
export default {
    name: 'players-view',
    store,
    data() {
        return { 
            points: 0,
            idxVisible: 0
        }
    },
    computed: {
      ...mapState(store, ['getEditPlayers'])
    },
    methods: {
      ...mapActions(store, ['init']),
      handlePularClick: function(){
        this.idxVisible++
      }
    },
    mounted(){
      this.init(this.$route.params.timeName)
    }
}
</script>

<style>
.image-slot{
    width: 230px;
    height: 230px;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    background: var(--el-bg-color);
    color: var(--el-text-color-placeholder);
    vertical-align: middle;
}
</style>