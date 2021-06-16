import ContestList from "@oj/views/contest/ContestList.vue"
import ContestDetail from "@oj/views/contest/ContestDetail.vue"
import ContestProblem from "@oj/views/contest/ContestProblem.vue"
import ContestRanking from "@oj/views/contest/ContestRanking.vue"

export default [
    {
        path: '/contest',
        name: 'contest-list',
        component: ContestList
    },
    {
        path: '/contest/:contestId',
        name: 'contest-detail',
        component: ContestDetail,
        props: true
    },
    {
        path: '/contest/problem/:contestId/:problemId',
        name: 'contest-problem',
        component: ContestProblem,
        props: true
    },
    {
        path: '/contest/ranking/:contestId',
        name: 'contest-rank',
        component: ContestRanking,
        props: true
    },
]
