<script setup lang="ts">
import type { DateValue, UploadFile } from 'tdesign-mobile-vue'

import { ref } from 'vue'

defineOptions({
  name: 'UserProfile',
})

const username = ref('小小轩')
const gender = ref('male') // 单选
const birthday = ref('1994-9-27')
const address = ref('广东省 深圳市')
const bio = ref('在你身边，为你设计')
const photos = ref<UploadFile[]>([
  { url: 'https://tdesign.gtimg.com/mobile/demos/upload4.png', status: 'success', type: 'image' },
  { url: 'https://tdesign.gtimg.com/mobile/demos/upload6.png', status: 'success', type: 'image' },
])

const isBirthdayPickerVisible = ref(false)
const isAddressPickerVisible = ref(false)
const addressOptions = [
  [{ label: '广东', value: 'guangdong' }, { label: '浙江', value: 'zhejiang' }],
  [{ label: '广州', value: 'guangzhou' }, { label: '深圳', value: 'shenzhen' }],
  [{ label: '福田', value: 'futian' }, { label: '南山', value: 'nanshan' }],
]

function onBirthdayConfirm(value: DateValue) {
  birthday.value = value.toString()
  isBirthdayPickerVisible.value = false
}

function onAddressConfirm() {
  isAddressPickerVisible.value = false
}

function onBack() {
  console.warn('Trigger: onBack')
}

function onSave() {
  console.warn('Trigger: onSave')
}
</script>

<template>
  <div class="user-profile-page">
    <t-navbar title="个人信息" :left-arrow="true" @left-click="onBack" />

    <div class="form-container">
      <t-cell-group>
        <t-input
          v-model="username"
          label="用户名"
          placeholder="请输入用户名"
        />
        <t-cell title="性别" class="gender-cell">
          <template #note>
            <t-radio-group v-model="gender" borderless class="gender-radio-group">
              <t-radio :block="false" name="gender" value="male" label="男" />
              <t-radio :block="false" name="gender" value="female" label="女" />
              <t-radio :block="false" name="gender" value="secret" label="保密" />
            </t-radio-group>
          </template>
        </t-cell>

        <t-cell title="生日" :note="birthday || '请选择生日'" arrow @click="isBirthdayPickerVisible = true" />
        <t-cell title="地址" :note="address || '请选择地址'" arrow @click="isAddressPickerVisible = true" />

        <t-cell title="个人简介">
          <template #note>
            <t-textarea
              v-model="bio"
              placeholder="请输入个人简介"
              :maxlength="50"
              indicator
            />
          </template>
        </t-cell>

        <t-cell title="相片墙">
          <template #note>
            <t-upload
              v-model="photos"
              multiple
              :max="9"
              theme="image"
            />
          </template>
        </t-cell>
      </t-cell-group>
    </div>

    <div class="button-wrapper">
      <t-button theme="primary" variant="base" size="large" shape="rectangle" block @click="onSave">
        保存
      </t-button>
    </div>

    <t-popup v-model="isBirthdayPickerVisible" position="bottom">
      <t-date-time-picker
        v-model="birthday"
        title="选择生日"
        mode="date"
        @confirm="onBirthdayConfirm"
        @cancel="isBirthdayPickerVisible = false"
      />
    </t-popup>

    <t-popup v-model="isAddressPickerVisible" position="bottom">
      <t-picker
        title="选择地址"
        :columns="addressOptions"
        @confirm="onAddressConfirm"
        @cancel="isAddressPickerVisible = false"
      />
    </t-popup>
  </div>
</template>

<style lang="scss" scoped>
.user-profile-page {
  background-color: var(--tmv-bg-color);
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.form-container {
  flex: 1;
  overflow-y: auto;
}

.button-wrapper {
  padding: 16px;
  background-color: #fff;
}

.gender-cell :deep(.t-cell__note) {
  justify-content: space-between;
  margin-left: 0;
}

.gender-radio-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/* 标签统一宽度 */
:deep(.t-input__label),
:deep(.t-textarea__label),
:deep(.t-cell__title) {
  width: 81px;
  min-width: 81px;
  max-width: 81px;
  height: 24px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

:deep(.t-cell__note) {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

:deep(.t-radio) {
  flex: none;
}

/* 文本域高度 */
:deep(.t-textarea .t-textarea__wrapper-inner),
:deep(.t-cell__note .t-textarea .t-textarea__wrapper-inner) {
  height: 72px;
  min-height: 72px;
  padding: 0;
}

:deep(.t-cell__note .t-textarea) {
  width: 100%;
  flex: 1;
  padding: 0;
}

:deep(.t-cell__note .t-textarea__wrapper) {
  border: none;
  padding: 0;
}

/* 上传组件缩放 */
:deep(.t-upload) {
  padding: 0;
  transform: scale(0.96);
  transform-origin: left center;
}
</style>
