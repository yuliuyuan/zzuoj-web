import SubmissionView from "@oj/views/submission/SubmissionList.vue"

export default [
    {
        path: '/submission',
        name: 'submission-list',
        component: SubmissionView,
        props: true
    },
]
