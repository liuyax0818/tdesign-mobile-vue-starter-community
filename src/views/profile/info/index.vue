<script setup lang='ts'>
import dayjs from 'dayjs'
import { addressData } from './utils/data'
import { useInfoHook } from './utils/hooks'
import { rules } from './utils/rules'

defineOptions({
  name: 'Info',
})

const { formRef, formData, allowSubmit, formVisible, addressLabel, handleSubmit, handleCasChange, handlePicChange } = useInfoHook()
</script>

<template>
  <div class="profile-info-wrapper pb-[80px] h-full overflow-y-scroll">
    <Banner title="个人信息" />

    <t-form
      ref="formRef"
      :data="formData"
      :rules="rules"
      reset-type="initial"
      scroll-to-first-error="auto"
      label-align="left"
    >
      <t-form-item label="用户名" name="username">
        <t-input v-model="formData.username" borderless placeholder="请输入用户名" />
      </t-form-item>

      <t-form-item label="性别" name="gender">
        <t-radio-group v-model="formData.gender" class="w-full flex justify-between" borderless>
          <t-radio :block="false" name="gender" value="man" label="男" />
          <t-radio :block="false" name="gender" value="women" label="女" />
          <t-radio :block="false" name="gender" value="secret" label="保密" />
        </t-radio-group>
      </t-form-item>

      <t-form-item arrow label="生日" name="birthday" content-align="right">
        <t-input
          v-model="formData.birthday"
          borderless
          align="right"
          placeholder="请选择生日"
          @click="formVisible.birthday = true"
        />
        <t-popup v-model="formVisible.birthday" placement="bottom">
          <t-date-time-picker
            v-model="formData.birthday"
            :mode="['date']"
            title="选择日期"
            format="YYYY-MM-DD"
            start="1900-1-1"
            :end="dayjs().format('YYYY-MM-DD')"
            @confirm="formVisible.birthday = false"
            @cancel="formVisible.birthday = false"
          />
        </t-popup>
      </t-form-item>

      <t-form-item arrow label="地址" name="address" content-align="right">
        <t-input
          v-model="addressLabel"
          borderless
          align="right"
          placeholder="请选择地址"
          @click="formVisible.address = true"
        />
        <t-cascader
          v-model:visible="formVisible.address"
          title="选择地址"
          theme="tab"
          :options="addressData.areaList"
          @change="handleCasChange"
        />
      </t-form-item>

      <t-form-item label="个人简介" name="bio">
        <t-textarea
          v-model="formData.bio"
          class="w-full h-[100px]"
          indicator
          :maxlength="50"
          placeholder="请输入个人简介"
        />
      </t-form-item>

      <t-form-item label="相片墙" name="photo">
        <t-upload
          class="upload-pic"
          :default-files="formData.photos"
          multiple
          theme="image"
          :max="9"
          action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
          @change="handlePicChange"
        />
      </t-form-item>
    </t-form>

    <div class="buttom-wrapper h-[80px] p-4 w-full absolute bottom-0">
      <t-button
        theme="primary"
        size="large"
        block
        :disabled="!allowSubmit"
        @click="handleSubmit"
      >
        保存
      </t-button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.buttom-wrapper,
.profile-info-wrapper {
  background-color: var(--tmv-bg-color);
}

.upload-pic {
  --td-upload-grid-columns: 3;
}
</style>
