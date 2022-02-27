<template>
  <div class="register">
      <b-row class="mt-5">
        <b-col md="8" offset-md="2" lg="6" offset-lg="3">
          <b-card title="注册">
          <b-form>
            <b-form-group
              label="用户名"
            >
              <b-form-input
                id="input-1"
                v-model="$v.user.name.$model"
                type="text"
                placeholder="用户名"
              ></b-form-input>

            </b-form-group>

            <b-form-group label="手机号">
              <b-form-input
                id="input-2"
                v-model="$v.user.telephone.$model"
                type="number"
                placeholder="手机号"
                :state="validateState('telephone')"
              ></b-form-input>
<!--              <b-form-text-->
<!--                id="password-help-block"-->
<!--                text-variant="danger"-->
<!--                v-if="showTelephoneValidate">-->
<!--                手机号必须为11位-->
<!--              </b-form-text>-->
              <b-form-invalid-feedback :state="validateState('telephone')">
                手机号不符合要求
              </b-form-invalid-feedback>
<!--              <b-form-valid-feedback :state="showTelephoneValidate">-->
<!--                手机号符合11位-->
<!--              </b-form-valid-feedback>-->
            </b-form-group>

            <b-form-group label="密码">
              <b-form-input
                id="input-3"
                v-model="$v.user.password.$model"
                type="password"
                placeholder="密码"
                :state="validateState('password')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('password')">
                密码必须大于等于6位
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group>
              <b-button @click="register" variant="outline-primary" block>注册</b-button>
            </b-form-group>
          </b-form>
          </b-card>
        </b-col>
      </b-row>

  </div>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators';
import customValidator from '@/helper/validator';
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      user: {
        name: '',
        telephone: '',
        password: '',
      },
      showTelephoneValidate: null,
    };
  },
  validations: {
    user: {
      name: {},
      telephone: {
        required,
        telephone: customValidator.telephoneValidator,
        // minLength: minLength(11),
        // maxLength: maxLength(11),
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    ...mapActions('userModule', { userRegister: 'register' }),
    validateState(name) {
      // es6结构赋值
      const { $dirty, $error } = this.$v.user[name];
      return $dirty ? !$error : null;
    },
    register() {
      // 验证数据
      this.$v.user.$touch();
      if (this.$v.user.$anyError) {
        return;
      }
      // 请求api
      this.userRegister(this.user).then(() => {
        // 跳转主页
        this.$router.replace({ name: 'Home' });
      }).catch((err) => {
        this.$bvToast.toast(err.response.data.msg, {
          title: '数据验证错误',
          variant: 'danger',
          solid: true,
        });
      });
      console.log('register');
    },
  },
};
</script>

<style scoped>

</style>
