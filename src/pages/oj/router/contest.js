import ContestList from "@oj/views/contest/ContestList.vue"
import ContestDetail from "@oj/views/contest/ContestDetail.vue"
export default [
    {
        path: '/contest',
        name: 'contest-list',
        component: ContestList
    },
    {
        path: '/contest/:contestId',
        name: 'contest-detail',
        component: ContestDetail
    }
]
