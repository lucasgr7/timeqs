<template>
<el-card class="box-card">
    <el-row>
        <el-col :span="24">
            <el-image :src="player.foto" fit="fill">
                <template #error>
                    <el-empty :image-size="148" fit="fill" description="Infelizmente não temos a foto dessa pessoa"  />
                </template>
            </el-image>
            <el-row class="picture-subtitle">
              <h2>{{ player.nome }}</h2>
            </el-row>
        </el-col>
    </el-row>
    <el-row justify="center">
      <h1 class="deepshadow">
        {{points}}
      </h1>
    </el-row>
    <el-slider :size="large" :min="1" :max="10" v-model="points"></el-slider>
    <el-divider></el-divider>
    <el-row justify="space-between">
        <el-col :span="6">
            <el-button size="large" :icon="Share" @click="this.$emit('skip')" type="danger">
                <i class="fa-regular fa-circle-right"></i>
            </el-button>
        </el-col>
        <el-col :span="6">
          <el-row justify="end">
              <el-button @click="this.$emit('confirm', {idx, points})" size="large" type="success">
                  <i class="fa fa-circle-check"></i>
              </el-button>
          </el-row>
        </el-col>
    </el-row>
</el-card>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
export default defineComponent({
  props: {
    player: Object,
    idx: Number
  },
  data(){
    return {
      points: 0
    }
  },
  emits: ['confirm', 'skip']
})
</script>

<style lang="scss" scoped>
.box-card{
  .el-button{
    font-size: 42px;
    border-radius: 80px;
    width: 52px;
    height: 52px;
  }
  .picture-subtitle{
    background: #ededed;
    margin-top: -7px;
    padding-left: 25px;
    border-radius: 0px 0px 28px
  }
}
h1{
  
    font-size: 32px;
    font-weight: 600;
}
h2{
  
    font-size: 22px;
    font-weight: 400;
    color: #4286dd;
}
@media screen and (max-width: 600px){
  .box-card{
    height: 100%;
    width: 100%;
  }
  .el-card__body{
    padding: 2px;
  }
}
</style>
