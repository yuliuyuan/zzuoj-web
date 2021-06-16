import ProblemList from "@oj/views/problem/ProblemList.vue"
import ProblemDetail from "@oj/views/problem/ProblemDetail.vue"
// import ProblemSubmission from "@oj/views/problem/ProblemSubmission.vue"
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
    },
    // {
    //     path: '/problem/:problemId/submission',
    //     name: 'problem-submission',
    //     component: ProblemSubmission
    // }
]
