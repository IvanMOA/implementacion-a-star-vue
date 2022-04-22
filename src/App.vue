<script lang="ts" setup>
import { AStar } from "./AStar";
import { CellConsoleAStarDrawer } from "./CellConsoleAStarDrawer";
import { ref } from "vue";
import { debounce, throttle } from "lodash";
const columns = 10;
const rows = 10;
const aStar = new AStar(columns, rows, new CellConsoleAStarDrawer());
const aStarRef = ref(aStar);
aStar.startingCellPosition = {
  rowIndex: 1,
  columnIndex: 1,
};
aStar.endCellPosition = {
  rowIndex: 3,
  columnIndex: 3,
};
aStar.calculateHeuristic();
const idsToTravel = ref(aStar.calculateIdsToTravel());
const handleCellPaint = throttle(
  (e: any, cellRowIndex: number, cellColumnIndex: number) => {
    if (e.buttons !== 1) return;
    aStarRef.value.cellsMatrix[cellRowIndex][cellColumnIndex].isBlocked = true;
  },
  50
);
const handleCellClick = (cellRowIndex: number, cellColumnIndex: number) => {
  aStarRef.value.cellsMatrix[cellRowIndex][cellColumnIndex].isBlocked = true;
};
const recalculate = () => {
  idsToTravel.value = aStarRef.value.calculateIdsToTravel();
};
</script>
<template>
  <div class="bg-purple-700 flex flex-col items-center justify-center h-screen">
    <h1 class="text-2xl text-gray-100">Axel Ivan Morales Ortega</h1>
    <h1 class="text-xl text-gray-200">1911084</h1>
    <h1 class="text-lg text-gray-300 text-purple-200 mb-4">
      Sistemas Adaptativos - Algoritmo A* - Laura del Bosque
    </h1>
    <div class="rounded-md shadow-md bg-white overflow-hidden">
      <div
        @dragover="onDrag"
        v-for="(row, rowIndex) in aStarRef.cellsMatrix"
        class="flex"
      >
        <Transition appear v-for="(cell, columnIndex) in row" name="fade">
          <div
            v-if="true"
            @mousemove="handleCellPaint($event, rowIndex, columnIndex)"
            @click="handleCellClick"
            class="h-10 w-10 transition-color duration-300"
            :class="{
              'bg-gray-600': cell.isBlocked,
              'bg-green-600': cell.id === aStar.startingCell.id,
              'bg-red-600': cell.id === aStar.endCell.id,
              'bg-cyan-600': idsToTravel.includes(cell.id),
            }"
          ></div>
        </Transition>
      </div>
    </div>
    <button
      @click="recalculate"
      class="bg-white text-violet-700 shadow-md mt-4 px-4 py-2 rounded-sm"
    >
      Re-Calcular
    </button>
  </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 300ms;
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
