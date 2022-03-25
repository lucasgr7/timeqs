
<template>
  <h2>Lista de jogadores</h2>
  <el-row justify="auto">
    <el-card 
      class="box-card"
      v-for="jogador, id of lista" 
      :key="id">
      <el-row>
        <el-col :span="24">
          <h2>{{jogador.nome}}</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-image :src="jogador.foto" :fit="contain">
          </el-image>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <h2>{{'Pontuação: 6'}}</h2>
        </el-col>
      </el-row>
    </el-card>
  </el-row>
</template>

<script>
export default {
  name: 'list-players',
  data(){
    return{
      lista: []
    }
  },
 
  mounted(){
    let listaJogadores = JSON.parse(localStorage.localDb)
    this.lista = listaJogadores.voleifranca.jogadores
  }

}

</script>

<style scoped>

.box-card {
  width: 450px;
}

</style>