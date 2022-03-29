<template>
  <el-row  v-if="getAvailablePontuation" justify="center">
    <transition-group tag="el-card" name="fade">
      <div class="box-card" v-for="(player, id) of getEditPlayers" :key="id" v-show="idxVisible == id">
        <CardPlayer :player="player" :idx="id" 
        @confirm="handleSetUserScore"
        @skip="handlePularClick"></CardPlayer>
      </div>
    </transition-group>
  </el-row>
  <el-row justify="center">
    <div class="label-finished" v-if="!getAvailablePontuation">
      <el-row>
        <el-col :span="24">
          <h1>
            <el-icon>
              ✔
            </el-icon>
            Parabéns todos os jogadores foram pontuados!
          </h1>
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
  </el-row>
</template>

<script lang="ts">
import {  mapActions, mapState } from 'pinia'
import { store } from '@/stores'
import CardPlayer from '@/components/CardPlayer.vue'
import VueCountdown from '@chenfengyuan/vue-countdown';
export default {
    name: 'players-view',
    store,
    components: {VueCountdown, CardPlayer},
    data() {
        return { 
            idxVisible: 0,
            timeRemaining: 0,
        }
    },
    computed: {
      ...mapState(store, ['getEditPlayers', 'getAvailablePontuation'])
    },
    methods: {
      ...mapActions(store, ['init', 'setUserScore', 'sync', 'userFinishedPontuatingAll']),
      handlePularClick: function(){
        this.points = 0
        this.idxVisible++
        if(this.idxVisible === this.getEditPlayers.length) this.userFinishedPontuatingAll()
      },
      handleSetUserScore: function({idx, points}: any){
        this.setUserScore(idx, points)
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

<style lang="scss">
.label-finished{
  padding: 13px;
  padding-top: 50%;
}
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