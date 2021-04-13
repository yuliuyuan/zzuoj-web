import ProblemList from "@oj/views/problem/ProblemList.vue"
import ProblemDetail from "@oj/views/problem/ProblemDetail.vue"
export default [
    {
        path: '/problem',
        name: 'problem-list',
        component: ProblemList
    },
    {
        path: '/problem/:problemId',
        name: 'problem-detail',
        component: ProblemDetail
    }
]
