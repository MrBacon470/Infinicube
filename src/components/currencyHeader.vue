<script setup>
    import { format } from '../numberFormatting';
    import Decimal from 'break_eternity.js';
    import * as player from '../main';
</script>

<template>
  <div class="header">
    <div class="currencyHolder">
      <img src="../assets/Matter.png" style="margin-right: 10px" />
      <div>{{format(player.default.matter)}} Matter</div>
    </div>
    <div class="currencyHolder">
      <img src="../assets/Antimatter.png" style="margin-right: 10px" />
      <div>{{format(new Decimal(0))}} Matter</div>
    </div>
  </div>
</template>

<style>
.currencyHolder {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 146px;
  margin-right: 40px;
}
.header {
  justify-content: center;
  margin: auto;
  display: flex;
  flex-direction: row;
  margin-top: 25px;
}
</style>
