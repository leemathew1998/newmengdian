<template>
  <a-layout-sider v-model="collapsed" :style="{ overflow: 'auto', position: 'fixed', left: 0 }" id="warp" width="80">
    <div class="logo_warp">
      <div class="logo" />
    </div>
    <a-menu theme="dark" mode="inline" :selectedKeys="selectedKeys" class="sider_menu" @click="changekeys">
      <a-menu-item key="/overView" v-show="roleControl['/dashboard']">
        <img src="@/assets/home.svg" alt="" class="svg" style="height: 44px;width: 44px;" />
        <span>
          首页
        </span>
      </a-menu-item>
      <a-menu-item key="/order" v-show="roleControl['/order']">
        <img src="@/assets/order.svg" alt="" class="svg" />
        <span>业务工单</span>
      </a-menu-item>
      <!-- <a-menu-item key="/overhaul" v-show="roleControl['/overhaul']">
				<img src="@/assets/u30.svg" alt="" class="svg" />
				<span>检修管理</span>
			</a-menu-item> -->
      <a-menu-item key="/antitheft" v-show="roleControl['/antitheft']">
        <img src="@/assets/u30.svg" alt="" class="svg" />
        <span>反窃查违</span>
      </a-menu-item>
      <a-menu-item key="/extend" v-show="roleControl['/extend']">
        <img src="@/assets/u20.svg" alt="" class="svg" />
        <span>供电方案</span>
        <span>辅助编制</span>
      </a-menu-item>
      <a-menu-item key="/achievements" v-show="roleControl['/achievements']">
        <img src="@/assets/u142.svg" alt="" class="svg" />
        <span>绩效管理</span>
      </a-menu-item>
      <!-- <a-menu-item key="/collection" v-show="roleControl['/collection']">
        <img src="@/assets/u146.svg" alt="" class="svg" />
        <span>采集数据</span>
      </a-menu-item> -->
      <a-menu-item key="/basic" v-show="roleControl['/basic']">
        <img src="@/assets/u146.svg" alt="" class="svg" />
        <span>基础服务</span>
      </a-menu-item>
      <a-menu-item key="/roleManagement" v-show="roleControl['/basic']">
        <img src="@/assets/u146.svg" alt="" class="svg" />
        <span>用户管理</span>
      </a-menu-item>
    </a-menu>
    <div class="logo_warp">
      <div class="filpLogo" />
    </div>
  </a-layout-sider>
</template>

<script>
import cookie from '@/utils/cookie.js'
export default {
	data() {
		return {
			collapsed: false,
			selectedKeys: [],
			roleControl: {
				'/dashboard': false,
				'/order': true,
				'/overhaul': true,
				'/antitheft': true,
				'/extend': true,
				'/achievements': true,
				'/collection': true,
				'/basic': true
			}
		}
	},
	created() {
		const role = this.$store.getters.role

		const nowRouter = this.$router.getRoutes()
		// 此处做标记，绩效主页面还是需要展示的，只是展示出来台区经理会跳到他的界面上去
		nowRouter.forEach((item) => {
			if (['/dashboard', '/overhaul', '/extend']
				.indexOf(item.path) != -1) {
				if (item.meta.roles.includes(role)) {
					this.roleControl[item.path] = true
				} else {
					this.roleControl[item.path] = false
				}
			}
		})
	},
	mounted() {
		const path = this.$route.path.split('/')
		this.selectedKeys = ['/' + path[1]]
	},
	methods: {
		changekeys(e) {
			this.selectedKeys = [e.key]
			if (e.key == '/extend') {
				const ticket = cookie.getCookie('ticket')
				window.open(
					`http://10.173.172.9:18880/#/mdPowerGrid/businessExpansionList?fromOrigin=otherSystem&projectName=台区精细化&RelyUserId=bc4ba096-ac22-4f68-b43d-9499679ede7a&MdTicket=${ticket}`,
					'_blank'
				)
			} else {
				this.$router.push(e.key)
			}
		}
	},
	computed: {

	}
}
</script>

<style lang="less" scoped>
#warp {
	background-color: #fff;
	width: 80px !important;

	.logo_warp {
		flex: 1;
		width: 75px;
		height: 75px;

		.logo {
			width: 75px;
			height: 75px;
			background-color: #28599d;
			border-top-right-radius: 75px;
		}

		.filpLogo {
			width: 75px;
			height: 75px;
			background-color: #28599d;
			border-bottom-right-radius: 75px;
		}
	}

	.sider_menu {
		// 侧边栏高度问题就在这里！！！
		height: calc(100vh - 150px);

		background-color: #28599d;
		width: 75px;
		display: flex;
		flex-direction: column;

		.ant-menu-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			width: 75px;
		}

		.ant-menu-item-selected {
			background-color: #D7D7D7;
		}

		span {
			font-weight: 700;
			font-size: 16px;
			line-height: 25px;
		}

		.svg {
			width: 28px;
			height: 28px;
			// background-color: #fff;
			color: #fff;
			// background-color: #28599d;
		}
	}

	.ant-layout-sider-children {
		display: flex;
		flex-direction: column;
	}
}

/deep/ .ant-menu-item {
	padding-left: 16px !important;
	justify-content: center;
}
</style>
