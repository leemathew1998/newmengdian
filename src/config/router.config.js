/* eslint-disable no-sparse-arrays */
import {
	DfztLayout,
	UserLayout
} from '@/components/layouts'

/**
 *
 管理员路由
 */

export const roleOne = [{
	path: '/overhaul',
	name: 'overhaul',
	component: () => import('@/views/overhaul/index')
}, {
	path: '/antitheft',
	name: 'antitheft',
	component: () => import('@/views/antitheft/index')
}, , {
	path: '/extend',
	name: 'extend',
	component: () => import('@/views/extend/index')
}, {
	path: '/achievements',
	name: 'achievements',
	component: () => import('@/views/achievements/index')
}, , {
	path: '/collection',
	name: 'collection',
	component: () => import('@/views/collection/index')
}, {
	path: '/basic',
	name: 'basic',
	component: () => import('@/views/basic/index')
}]

/**
 * 基础路由
 * @type { *[] }
 */

export const constantRouterMap = [{
	path: '/',
	name: 'layout',
	component: DfztLayout,
	meta: {
		roles: ['admin', 'user']
	},
	redirect: '/overView',
	children: [{
		path: '/dashboard',
		name: 'dashboard',
		component: () => import('@/views/dashboard/index'),
		meta: {
			roles: ['admin', 'user']
		}
	},
	{
		path: '/order',
		name: 'order',
		meta: {
			roles: ['admin', 'user']
		},
		redirect: '/order/collection',
		component: () => import('@/views/order/index'),
		hidden: true,
		children: [{
			path: 'collection',
			name: 'collection',
			meta: {
				roles: ['admin', 'user']
			},
			component: () => import('@/views/order/tables/collection')
		}, {
			path: 'metering',
			name: 'metering',
			meta: {
				roles: ['admin', 'user']
			},
			component: () => import('@/views/order/tables/metering')
		}, {
			path: 'lineloss',
			name: 'lineloss',
			meta: {
				roles: ['admin', 'user']
			},
			component: () => import('@/views/order/tables/lineloss')
		}, {
			path: 'charge',
			name: 'charge',
			meta: {
				roles: ['admin', 'user']
			},
			component: () => import('@/views/order/tables/charge')
		}, {
			path: 'recovery',
			name: 'recovery',
			meta: {
				roles: ['admin', 'user']
			},
			component: () => import('@/views/order/tables/recovery')
		}, {
			path: 'copy',
			name: 'copy',
			meta: {
				roles: ['admin', 'user']
			},
			component: () => import('@/views/order/tables/copy')
		}, {
			path: 'service',
			name: 'service',
			meta: {
				roles: ['admin', 'user']
			},
			component: () => import('@/views/order/tables/service')
		}, {
			path: 'activeMetering',
			name: 'activeMetering',
			meta: {
				roles: ['admin', 'user']
			},
			component: () => import('@/views/order/tables/activeMetering')
		}, {
			path: 'activeRepair',
			name: 'activeRepair',
			meta: {
				roles: ['admin', 'user']
			},
			component: () => import('@/views/order/tables/activeRepair')
		},
		{
			path: 'interworking',
			name: 'interworking',
			meta: {
				roles: ['admin', 'user']
			},
			component: () => import('@/views/order/tables/interworking')
		},
		{
			path: 'maintenance',
			name: 'maintenance',
			meta: {
				roles: ['admin', 'user']
			},
			component: () => import('@/views/order/tables/maintenance')
		}]
	},
	{
		path: '/overhaul',
		name: 'overhaul',
		meta: {
			roles: ['admin', 'user']
		},
		component: () => import('@/views/overhaul/index')
	}, {
		path: '/antitheft',
		name: 'antitheft',
		meta: {
			roles: ['admin', 'user']
		},
		component: () => import('@/views/antitheft/index')
	}, , {
		path: '/extend',
		name: 'extend',
		meta: {
			roles: ['admin', 'user']
		},
		component: () => import('@/views/extend/index')
	}, {
		path: '/achievements',
		name: 'achievements',
		meta: {
			roles: ['admin']
		},
		component: () => import('@/views/achievements/index')
	}, {
		path: '/achievements/site',
		name: 'achievements/site',
		meta: {
			roles: ['admin']
		},
		component: () => import('@/views/achievements/site')
	},
	{
		path: '/achievements/manger',
		name: 'achievements/manger',
		meta: {
			roles: ['admin', 'user']
		},
		component: () => import('@/views/achievements/manger')
	},
	{
		path: '/achievements/manger-copy',
		name: 'achievements/manger-copy',
		meta: {
			roles: ['admin', 'user']
		},
		component: () => import('@/views/achievements/manger-copy')
	},
	{
		path: '/basic',
		name: 'basic',
		meta: {
			roles: ['admin', 'user']
		},
		redirect: '/basic/sensitive',
		component: () => import('@/views/basic/index'),
		hidden: true,
		children: [{
			path: 'sensitive',
			name: 'sensitive',
			meta: {
				roles: ['admin', 'user']
			},
			component: () => import('@/views/basic/tables/sensitive')
		},
		{
			path: 'hourly',
			name: 'hourly',
			meta: {
				roles: ['admin', 'user']
			},
			component: () => import('@/views/basic/tables/hourly')
		},
		{
			path: 'consumer',
			name: 'consumer',
			meta: {
				roles: ['admin', 'user']
			},
			component: () => import('@/views/basic/tables/consumer')
		},
		{
			path: 'party',
			name: 'party',
			meta: {
				roles: ['admin', 'user']
			},
			component: () => import('@/views/basic/tables/party')
		}

		]
	},
	{
		path: '/roleManagement',
		name: 'roleManagement',
		meta: {
			roles: ['admin', 'user']
		},
		component: () => import('@/views/user/roleManagement/index')
	}
	]
},
{
	path: '/user',
	component: UserLayout,
	redirect: '/user/login',
	meta: {
		roles: ['admin', 'user']
	},
	hidden: true,
	children: [{
		path: 'login',
		name: 'login',
		meta: {
			roles: ['admin', 'user']
		},
		component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
	},
	{
		path: 'register',
		name: 'register',
		meta: {
			roles: ['admin', 'user']
		},
		component: () => import(/* webpackChunkName: "user" */ '@/views/user/register/Register')
	},
	{
		path: 'register-result',
		name: 'registerResult',
		meta: {
			roles: ['admin', 'user']
		},
		component: () => import(/* webpackChunkName: "user" */ '@/views/user/register/RegisterResult')
	},
	{
		path: 'alteration',
		name: 'alteration',
		meta: {
			roles: ['admin', 'user']
		},
		component: () => import(/* webpackChunkName: "user" */ '@/views/user/alteration/Alteration')
	}
	]
},
{
	path: '/404',
	name: '404',
	meta: {
		roles: ['admin', 'user']
	},
	component: () => import('@/views/exception/404')
},
{
	path: '/overView',
	name: 'overView',
	meta: {
		roles: ['admin', 'user']
	},
	component: () => import('@/views/user/overView.vue')
},
{
	path: '/overView1',
	name: 'overView1',
	meta: {
		roles: ['admin', 'user']
	},
	component: () => import('@/views/user/overView1.vue')
},
{
	path: '*',
	meta: {
		roles: ['admin', 'user']
	},
	redirect: '/404',
	hidden: true
}
]
