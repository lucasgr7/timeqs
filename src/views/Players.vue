<template>
  <el-row justify="center">
    <transition-group tag="el-card" name="fade">
      <el-card
        class="box-card"
        v-for="(player, id) of getEditPlayers"
        :key="id"
        v-show="idxVisible == id"
      >
        <el-row>
          <el-col :span="24">
            <h3>{{ player.nome }}</h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-image :src="player.foto" :fit="contain">
              <template #error>
                <div class="image-slot">Sem foto</div>
                <!-- //TODO: Criar quando usuário não tiver foto -->
              </template>
            </el-image>
          </el-col>
        </el-row>
        <el-slider
          :size="large"
          :min="1"
          :max="10"
          v-model="points"
        ></el-slider>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="8">
            <el-button
              size="large"
              :icon="Share"
              @click="handlePularClick"
              type="danger"
            >
              <i class="fa fa-circle-xmark"></i>
            </el-button>
          </el-col>
          <el-col :offset="12" :span="4">
            <el-button
              @click="(event) => handleSetUserScore(player, id)"
              size="large"
              type="success"
            >
              <i class="fa fa-circle-check"></i>
            </el-button>
          </el-col>
        </el-row>
      </el-card>
      <div v-if="isFinished">
        <el-row>
          <el-col :span="24">
            <h3>
              Parabéns todos os jogadores foram pontuados!
              <el-icon>
                ✔
              </el-icon>
            </h3>
          </el-col>
        </el-row>
        <hr/>
        <el-row>
          <el-col>
            <h4>
              <vue-countdown :time="timeRemaining" v-slot="{days, hours, minutes, seconds}">
                Poderá repontuar novamente em: <b>{{days}} dias, {{ hours }} horas, {{ minutes }} minutos, {{ seconds }} segundos.</b>
              </vue-countdown>
            </h4>
          </el-col>
        </el-row>
      </div>
    </transition-group>
  </el-row>
</template>

<script lang="ts">
import {  mapActions, mapState } from 'pinia'
import { store } from '@/stores'
import VueCountdown from '@chenfengyuan/vue-countdown';
export default {
    name: 'players-view',
    store,
    components: {VueCountdown},
    data() {
        return { 
            points: 0,
            idxVisible: 0,
            timeRemaining: 10,
            isFinished: false,
        }
    },
    computed: {
      ...mapState(store, ['getEditPlayers'])
    },
    methods: {
      ...mapActions(store, ['init', 'setUserScore', 'sync']),
      handlePularClick: function(){
        this.points = 0
        this.idxVisible++
        this.isFinished = this.idxVisible === this.getEditPlayers.length
      },
      handleSetUserScore: function(player: any, idx: number){
        this.setUserScore(idx, this.points)
        this.sync()
        this.handlePularClick()
      }
    },
    mounted(){
      this.init(this.$route.params.timeName)
      var nextMonday = new Date() as any;
      var today = new Date() as any;
      nextMonday.setDate(nextMonday.getDate() + (((1 + 7 - nextMonday.getDay()) % 7) || 7));
      this.timeRemaining = (nextMonday - today)
    }
}
</script>

<style>
.image-slot {
  width: 230px;
  height: 230px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background: var(--el-bg-color);
  color: var(--el-text-color-placeholder);
  vertical-align: middle;
}

/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  opacity: 0.3;
  transform: translate(00px, 90px);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(150px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>