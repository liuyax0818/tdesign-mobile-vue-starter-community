<script setup lang='ts'>
import type { BaseTableCol, TableRowData } from 'tdesign-mobile-vue'

defineProps<{
  data: any[]
}>()

const tableCol: BaseTableCol<TableRowData>[] = [
  {
    title: '标题',
    colKey: 'title',
    width: 91.75,
    align: 'center',
    fixed: 'left',
  },
  {
    title: '全球',
    colKey: 'global',
    width: 93.75,
    align: 'center',
  },
  {
    title: '华北',
    colKey: 'northChina',
    width: 93.75,
    align: 'center',
  },
  {
    title: '华东',
    colKey: 'eastChina',
    width: 93.75,
    align: 'center',
  },
  {
    title: '华南',
    colKey: 'southChina',
    width: 93.75,
    align: 'center',
  },
]
</script>

<template>
  <div class="t-cell-group--card bg-white p-4">
    <div class="text-sm font-semibold">
      按区域统计
    </div>
    <div class="mt-3">
      <t-table
        :data="data"
        :columns="tableCol"
        row-key="title"
        size="small"
        :max-height="400"
        stripe
        bordered
        class="area-table"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.area-table {
  :deep(.t-table__content) {
    border-radius: 6px;
    .t-table__header--fixed:not(.t-table__header--multiple) > tr > th {
      background-color: #fff;
    }
  }
}
</style>
