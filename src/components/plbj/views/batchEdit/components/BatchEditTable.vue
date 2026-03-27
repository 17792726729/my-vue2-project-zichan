<template>
  <div class="batch-edit-table">
    <div class="table-container">
      <vxe-table
        ref="tableRef"
        :data="data"
        :loading="loading"
        :edit-config="{ trigger: 'click', mode: 'cell' }"
        :column-config="{ resizable: true, minWidth: 100 }"
        :scroll-y="{ enabled: true }"
        :scroll-x="{ enabled: true }"
        height="auto"
        border
        show-overflow
        @scroll="handleScroll"
      >
        <vxe-table-column type="seq" title="序号" width="60" fixed="left" />
        <!-- <vxe-table-column type="checkbox" width="40" fixed="left" /> -->

        <vxe-table-column
          v-for="col in visibleColumns"
          :key="col.field"
          :field="col.field"
          :title="col.title"
          :min-width="col.minWidth || 100"
          :edit-render="col.editable ? { name: getEditRenderType(col) } : null"
        >
          <template #default="{ row }">
            <span
              v-if="isErrorCell(row.id, col.field)"
              class="error-cell"
              :title="getErrorMessage(row.id, col.field)"
            >
              {{ row[col.field] }}
            </span>
            <span v-else>{{ row[col.field] }}</span>
          </template>

          <template #edit="{ row }">
            <component
              :is="getEditComponent(col)"
              v-model="row[col.field]"
              v-bind="getEditProps(col)"
              @change="handleCellChange($event, row, col.field)"
            />
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>

    <!-- 分页 -->
    <div class="table-pagination">
      <Page
        :total="total"
        :current="currentPage"
        :page-size="pageSize"
        show-sizer
        show-total
        @on-change="handlePageChange"
        @on-page-size-change="handlePageSizeChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BatchEditTable',

  props: {
    data: {
      type: Array,
      default: () => []
    },
    fieldConfig: {
      type: Object,
      default: () => {}
    },
    validations: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    showErrorOnly: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      currentPage: 1,
      pageSize: 10
    }
  },

  computed: {
    total() {
      return this.data.length
    },

    visibleColumns() {
      const columns = []
      for (const [field, config] of Object.entries(this.fieldConfig)) {
        if (config.title) {
          columns.push({
            field,
            title: config.title,
            minWidth: 100,
            editable: config.editable !== false,
            type: config.type
          })
        }
      }
      return columns
    },

    // 构建错误映射：{ id_field: message }
    errorMap() {
      const map = {}
      this.validations.forEach(v => {
        map[`${v.id}_${v.field}`] = v.message
      })
      return map
    }
  },

  mounted() {},

  beforeDestroy() {},

  methods: {
    getEditRenderType(col) {
      const typeMap = {
        Input: 'input',
        InputNumber: '$input',
        DatePicker: '$input',
        TreeList: '$select',
        InputDepartment: '$input',
        InputPerson: '$input'
      }
      return typeMap[col.type] || 'input'
    },

    getEditComponent(col) {
      const componentMap = {
        Input: 'Input',
        InputNumber: 'InputNumber',
        DatePicker: 'DatePicker',
        TreeList: 'Select',
        InputDepartment: 'Input',
        InputPerson: 'Input'
      }
      return componentMap[col.type] || 'Input'
    },

    getEditProps(col) {
      if (col.type === 'TreeList' || col.type === 'Select') {
        return {
          placeholder: `请选择${col.title}`
        }
      }
      return {
        placeholder: `请输入${col.title}`
      }
    },

    handleCellChange(value, row, field) {
      this.$emit('edit', { row, field, value })
    },

    isErrorCell(id, field) {
      return !!this.errorMap[`${id}_${field}`]
    },

    getErrorMessage(id, field) {
      return this.errorMap[`${id}_${field}`] || ''
    },

    handlePageChange(page) {
      this.currentPage = page
      this.$emit('page-change', page)
    },

    handlePageSizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.$emit('page-size-change', size)
    },

    handleScroll() {
      // 可以在这里处理滚动相关逻辑
    },

    // 滚动到指定行
    scrollToRow(row) {
      const index = this.data.findIndex(item => item.id === row.id)
      if (index !== -1) {
        const pageIndex = Math.floor(index / this.pageSize)
        if (pageIndex + 1 !== this.currentPage) {
          this.currentPage = pageIndex + 1
          this.$nextTick(() => {
            this.$refs.tableRef?.scrollToRow(index % this.pageSize)
          })
        } else {
          this.$refs.tableRef?.scrollToRow(index % this.pageSize)
        }
      }
    },

    // 获取选中的行
    getSelectedRows() {
      return this.$refs.tableRef?.getCheckboxRecords() || []
    }
  }
}
</script>

<style lang="less" scoped>
.batch-edit-table {
  // flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  background: #fff;

  .table-container {
    flex: 1;
    overflow: hidden;
  }

  .error-cell {
    color: #f56c6c;
    background-color: #fef0f0;
    padding: 2px 4px;
    border-radius: 2px;
  }

  .table-pagination {
    padding: 12px 0;
    text-align: right;
    flex-shrink: 0;
  }
}
</style>
