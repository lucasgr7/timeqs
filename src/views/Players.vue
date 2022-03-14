<template>
    <el-row justify="center">
      <transition-group tag="el-card" name="fade">
        <el-card class="box-card" v-for="(player, id) of getEditPlayers" :key="id" v-show="idxVisible == id">
          <el-row>
            <el-col :span="24">
              <h3>{{player.nome}}</h3>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">          
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
          <el-slider :size="large" :min="1" :max="10" v-model="points"></el-slider>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="8">
              <el-button size="large" :icon="Share"  @click="handlePularClick" type="danger">
                <i class="fa fa-circle-xmark"></i>
              </el-button>
            </el-col>
            <el-col :offset="9" :span="6">
              <el-button @click="(event) => handleSetUserScore(player, id)" size="large" type="success">
                <i class="fa fa-circle-check"></i>
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </transition-group>
    </el-row>
</template>

<script lang="ts">
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
      ...mapActions(store, ['init', 'setUserScore']),
      handlePularClick: function(){
        this.points = 0
        this.idxVisible++
      },
      handleSetUserScore: function(player: any, idx: number){
        this.setUserScore(idx, this.points)
        this.handlePularClick()
      }
      //TODO: Direcionar página de parabenização por conclusão
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

.fade-enter-active {
  animation: bounce-in 0.9s;
}
.fade-leave-active {
  animation: bounce-in 0.9s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

</style>