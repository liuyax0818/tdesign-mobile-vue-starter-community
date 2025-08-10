<script setup lang="ts">
import { useProfileEdit } from './hooks'

defineOptions({
  name: 'UserProfile',
})

const {
  formData,
  addressValue,
  addressOptions,
  isBirthdayPickerVisible,
  isAddressPickerVisible,
  errors,
  validateUsername,
  validateGender,
  validateBio,
  onBirthdayConfirm,
  onAddressConfirm,
  onPhotoChange,
  onBack,
  onSave,
} = useProfileEdit()
</script>

<template>
  <div class="user-profile-page">
    <t-navbar title="个人信息" :left-arrow="true" @left-click="onBack" />

    <div class="form-container">
      <t-cell-group>
        <t-input
          v-model="formData.username"
          label="用户名"
          placeholder="请输入用户名"
          :status="errors.username ? 'error' : undefined"
          @blur="errors.username = validateUsername(formData.username)"
          @input="errors.username = ''"
        />
        <div v-if="errors.username" class="inline-error">
          {{ errors.username }}
        </div>

        <t-cell title="性别" class="gender-cell" :class="{ 'error-border': errors.gender }">
          <template #note>
            <t-radio-group
              v-model="formData.gender"
              borderless
              class="gender-radio-group"
              @change="errors.gender = validateGender(formData.gender)"
            >
              <t-radio :block="false" name="gender" value="male" label="男" />
              <t-radio :block="false" name="gender" value="female" label="女" />
              <t-radio :block="false" name="gender" value="secret" label="保密" />
            </t-radio-group>
          </template>
        </t-cell>
        <div v-if="errors.gender" class="inline-error">
          {{ errors.gender }}
        </div>

        <t-cell title="生日" :note="formData.birthday || '请选择生日'" arrow :class="{ 'error-border': errors.birthday }" @click="isBirthdayPickerVisible = true" />
        <div v-if="errors.birthday" class="inline-error">
          {{ errors.birthday }}
        </div>

        <t-cell title="地址" :note="formData.address || '请选择地址'" arrow :class="{ 'error-border': errors.address }" @click="isAddressPickerVisible = true" />
        <div v-if="errors.address" class="inline-error">
          {{ errors.address }}
        </div>

        <t-cell title="个人简介" :class="{ 'error-border': errors.bio }">
          <template #note>
            <t-textarea
              v-model="formData.bio"
              placeholder="请输入个人简介"
              :maxlength="50"
              indicator
              @blur="errors.bio = validateBio(formData.bio)"
              @input="errors.bio = ''"
            />
          </template>
        </t-cell>
        <div v-if="errors.bio" class="inline-error">
          {{ errors.bio }}
        </div>

        <t-cell title="相片墙" :class="{ 'error-border': errors.photos }">
          <template #note>
            <t-upload
              :default-files="formData.photos"
              multiple
              theme="image"
              :max="9"
              :grid-config="{ column: 3 }"
              action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
              @change="onPhotoChange"
            />
          </template>
        </t-cell>
        <div v-if="errors.photos" class="inline-error">
          {{ errors.photos }}
        </div>
      </t-cell-group>
    </div>

    <div class="button-wrapper">
      <t-button theme="primary" variant="base" size="large" shape="rectangle" block @click="onSave">
        保存
      </t-button>
    </div>

    <t-popup v-model="isBirthdayPickerVisible" placement="bottom">
      <t-date-time-picker
        :value="formData.birthday"
        :mode="['date']"
        title="选择生日"
        format="YYYY-MM-DD"
        start="1930-01-01"
        :end="`${new Date().getFullYear() - 1}-12-31`"
        @confirm="onBirthdayConfirm"
        @cancel="isBirthdayPickerVisible = false"
      />
    </t-popup>

    <t-popup v-model="isAddressPickerVisible" placement="bottom">
      <t-picker
        v-model="addressValue"
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
  padding-bottom: 80px; /* 为底部按钮留出空间 */
}

.button-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background-color: #fff;
  border-top: 1px solid #f0f0f0;
  z-index: 100;
}

.inline-error {
  padding: 4px 16px 8px;
  color: var(--td-error-color);
  font-size: 12px;
  background-color: #fff;
}

.error-border :deep(.t-cell__body) {
  border-left: 2px solid var(--td-error-color);
  padding-left: 14px;
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
