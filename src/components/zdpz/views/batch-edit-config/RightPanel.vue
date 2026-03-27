<template>
  <div class="right-panel">
    <div class="panel-title">字段配置项</div>

    <div class="config-form">
      <!-- 字段信息 -->
      <div class="field-info">
        <div class="info-item">
          <span class="label">字段代码：</span>
          <span class="value">{{ selectedFieldConfig.field || '-' }}</span>
        </div>
        <div class="info-item">
          <span class="label">字段名称：</span>
          <span class="value">{{ selectedFieldConfig.title || '-' }}</span>
        </div>
        <div class="info-item">
          <span class="label">字段类型：</span>
          <span class="value">{{ fieldTypeName || '-' }}</span>
        </div>
      </div>

      <Divider />

      <!-- 配置项 -->
      <div class="config-items">
        <!-- 是否可编辑 -->
        <div class="config-item">
          <Checkbox
            v-model="localConfig.isEdit"
            @on-change="handleConfigChange('isEdit', localConfig.isEdit)"
          >
            是否可编辑
          </Checkbox>
        </div>

        <!-- 是否多选 - 根据字段类型显示 -->
        <div
          class="config-item"
          v-if="showMultipleConfig"
        >
          <Checkbox
            v-model="localConfig.isMultiple"
            @on-change="handleConfigChange('isMultiple', localConfig.isMultiple)"
          >
            是否多选
          </Checkbox>
        </div>

        <!-- 是否叶子节点 - 根据字段类型显示 -->
        <div
          class="config-item"
          v-if="showLeafConfig"
        >
          <Checkbox
            v-model="localConfig.isleaf"
            @on-change="handleConfigChange('isleaf', localConfig.isleaf)"
          >
            是否只能选叶子节点
          </Checkbox>
        </div>

        <!-- 过滤值 - 根据字段类型显示 -->
        <div
          class="config-item"
          v-if="showFilterConfig"
        >
          <div class="filter-label">过滤值：</div>
          <Input
            v-model="localConfig.filterVal"
            placeholder="多个值用逗号分隔"
            @on-change="handleFilterChange"
          />
          <div class="filter-tip">示例：01,02,03</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FIELD_TYPE } from './constants'

export default {
  name: 'RightPanel',
  props: {
    selectedFieldConfig: {
      type: Object,
      default: () => {}
    },
    fieldType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localConfig: {
        isEdit: true,
        isMultiple: false,
        isleaf: true,
        filterVal: ''
      }
    }
  },
  computed: {
    /**
     * 字段类型名称
     */
    fieldTypeName() {
      const typeMap = {
        [FIELD_TYPE.INPUT]: '文本输入框',
        [FIELD_TYPE.INPUT_NUMBER]: '数值输入框',
        [FIELD_TYPE.DATE_PICKER]: '日期选择',
        [FIELD_TYPE.BASE_DATA_TREE]: '基础数据树形选择',
        [FIELD_TYPE.INPUT_DEPARTMENT]: '部门主数据',
        [FIELD_TYPE.INPUT_DEPOSITARY]: '保管机构主数据',
        [FIELD_TYPE.INPUT_PERSON]: '人员主数据'
      }
      return typeMap[this.fieldType] || this.fieldType
    },

    /**
     * 是否显示多选配置
     */
    showMultipleConfig() {
      return [
        FIELD_TYPE.BASE_DATA_TREE,
        FIELD_TYPE.INPUT_DEPARTMENT,
        FIELD_TYPE.INPUT_DEPOSITARY,
        FIELD_TYPE.INPUT_PERSON
      ].includes(this.fieldType)
    },

    /**
     * 是否显示叶子节点配置
     */
    showLeafConfig() {
      return [
        FIELD_TYPE.BASE_DATA_TREE,
        FIELD_TYPE.INPUT_DEPARTMENT,
        FIELD_TYPE.INPUT_DEPOSITARY,
        FIELD_TYPE.INPUT_PERSON
      ].includes(this.fieldType)
    },

    /**
     * 是否显示过滤值配置
     */
    showFilterConfig() {
      return [
        FIELD_TYPE.BASE_DATA_TREE,
        FIELD_TYPE.INPUT_DEPARTMENT,
        FIELD_TYPE.INPUT_DEPOSITARY,
        FIELD_TYPE.INPUT_PERSON
      ].includes(this.fieldType)
    }
  },
  watch: {
    selectedFieldConfig: {
      handler(val) {
        if (val && val.config) {
          this.localConfig = {
            isEdit: val.config.isEdit !== false,
            isMultiple: val.config.isMultiple || false,
            isleaf: val.config.isleaf !== false,
            filterVal: val.config.filterVal || ''
          }
        } else {
          this.localConfig = {
            isEdit: true,
            isMultiple: false,
            isleaf: true,
            filterVal: ''
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    /**
     * 配置项变更
     */
    handleConfigChange() {
      this.$emit('config-change', {
        config: {
          ...this.localConfig
        }
      })
    },

    /**
     * 过滤值变更
     */
    handleFilterChange() {
      this.$emit('config-change', {
        config: {
          ...this.localConfig
        }
      })
    }
  }
}
</script>

<style scoped>
.right-panel {
  width: 320px;
  background: #fff;
  margin-left: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.panel-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e8e8;
}

.config-form {
  flex: 1;
}

.field-info {
  margin-bottom: 16px;
}

.info-item {
  display: flex;
  margin-bottom: 8px;
  font-size: 14px;
}

.info-item .label {
  color: #666;
  flex-shrink: 0;
}

.info-item .value {
  color: #333;
  word-break: break-all;
}

.config-items {
  padding-top: 8px;
}

.config-item {
  margin-bottom: 16px;
}

.filter-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.filter-tip {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
</style>
