<template>
  <div class="middle-panel">
    <!-- 搜索框 -->
    <div class="search-bar">
      <Input
        v-model="searchValue"
        placeholder="搜索字段"
        clearable
        @on-change="handleSearch"
      >
        <Icon type="ios-search" slot="prefix" />
      </Input>
    </div>

    <!-- 字段分组列表 -->
    <div class="field-groups">
      <Collapse v-model="activeGroups">
        <Panel
          v-for="(group, key) in filteredFieldGroups"
          :key="key"
          :name="key"
        >
          <span class="group-title">{{ group.title }}</span>
          <span class="group-count">({{ group.fields.length }})</span>
          <template #content>
            <div class="field-list">
              <div
                v-for="field in group.fields"
                :key="field.field"
                :class="['field-item', { active: selectedFieldKey === field.field }]"
                @click="handleFieldClick(field)"
              >
                <span class="field-title">{{ field.title }}</span>
                <Icon
                  v-if="field.config && field.config.isEdit"
                  type="ios-create-outline"
                  class="field-edit-icon"
                />
              </div>
              <div v-if="group.fields.length === 0" class="field-empty">
                暂无字段
              </div>
            </div>
          </template>
        </Panel>
      </Collapse>

      <!-- 无搜索结果 -->
      <div v-if="Object.keys(filteredFieldGroups).length === 0 && searchValue" class="search-empty">
        未找到匹配的字段
      </div>
    </div>

    <!-- 排序按钮 -->
    <div class="sort-buttons">
      <Button size="small" @click="handleMoveUp" :disabled="!selectedFieldKey">
        <Icon type="ios-arrow-up" />上移
      </Button>
      <Button size="small" @click="handleMoveDown" :disabled="!selectedFieldKey">
        <Icon type="ios-arrow-down" />下移
      </Button>
    </div>
  </div>
</template>

<script>
import { FIELD_GROUP, FIELD_GROUP_KEY } from './constants'

export default {
  name: 'MiddlePanel',
  props: {
    fieldConfigList: {
      type: Object,
      default: () => {}
    },
    selectedFieldKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeGroups: [FIELD_GROUP_KEY.BASE],
      searchValue: '',
      fieldGroups: {
        [FIELD_GROUP_KEY.BASE]: { title: FIELD_GROUP.BASE, fields: [] },
        [FIELD_GROUP_KEY.FINANCE]: { title: FIELD_GROUP.FINANCE, fields: [] },
        [FIELD_GROUP_KEY.USE]: { title: FIELD_GROUP.USE, fields: [] },
        [FIELD_GROUP_KEY.SPECIAL]: { title: FIELD_GROUP.SPECIAL, fields: [] },
        [FIELD_GROUP_KEY.DISPOSE]: { title: FIELD_GROUP.DISPOSE, fields: [] }
      }
    }
  },
  computed: {
    /**
     * 过滤后的字段分组
     */
    filteredFieldGroups() {
      if (!this.searchValue) {
        return this.fieldGroups
      }

      const search = this.searchValue.toLowerCase()
      const filtered = {}

      Object.keys(this.fieldGroups).forEach(key => {
        const group = this.fieldGroups[key]
        const matchedFields = group.fields.filter(field =>
          field.title.toLowerCase().includes(search) ||
          field.field.toLowerCase().includes(search)
        )

        if (matchedFields.length > 0) {
          filtered[key] = {
            ...group,
            fields: matchedFields
          }
        }
      })

      return filtered
    }
  },
  watch: {
    fieldConfigList: {
      handler(val) {
        this.parseFieldConfig(val)
        this.searchValue = ''
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    /**
     * 搜索
     */
    handleSearch() {
      // 搜索逻辑通过computed属性 filteredFieldGroups 实现
    },

    /**
     * 解析字段配置
     */
    parseFieldConfig(config) {
      if (!config) {
        Object.keys(this.fieldGroups).forEach(key => {
          this.fieldGroups[key].fields = []
        })
        return
      }

      Object.keys(FIELD_GROUP_KEY).forEach(key => {
        const configKey = FIELD_GROUP_KEY[key]
        const fields = config[configKey] || []
        this.fieldGroups[configKey].fields = fields.map(field => ({
          ...field,
          config: field.config || {
            isEdit: true,
            isMultiple: false,
            isleaf: true,
            filterVal: ''
          }
        }))
      })
    },

    /**
     * 字段点击
     */
    handleFieldClick(field) {
      this.$emit('field-select', field.field, field)
    },

    /**
     * 上移
     */
    handleMoveUp() {
      if (!this.selectedFieldKey) return

      this.$emit('sort-change', {
        fieldKey: this.selectedFieldKey,
        direction: 'up'
      })
    },

    /**
     * 下移
     */
    handleMoveDown() {
      if (!this.selectedFieldKey) return

      this.$emit('sort-change', {
        fieldKey: this.selectedFieldKey,
        direction: 'down'
      })
    }
  }
}
</script>

<style scoped>
.middle-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin-left: 10px;
  padding: 16px;
  overflow-y: auto;
}

.search-bar {
  margin-bottom: 12px;
}

.search-bar .ivu-input-wrapper {
  width: 100%;
}

.field-groups {
  flex: 1;
}

.group-title {
  font-weight: 500;
}

.group-count {
  color: #999;
  margin-left: 4px;
}

.field-list {
  max-height: 200px;
  overflow-y: auto;
}

.field-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 4px;
  transition: all 0.2s;
}

.field-item:hover {
  background: #f5f5f5;
}

.field-item.active {
  background: #e6f7ff;
  border: 1px solid #91d5ff;
}

.field-title {
  flex: 1;
}

.field-edit-icon {
  color: #52c41a;
  margin-left: 8px;
}

.field-empty {
  text-align: center;
  color: #999;
  padding: 12px;
}

.search-empty {
  text-align: center;
  color: #999;
  padding: 24px;
  font-size: 14px;
}

.sort-buttons {
  display: flex;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid #e8e8e8;
  margin-top: 16px;
}

.sort-buttons .ivu-btn {
  flex: 1;
}
</style>
