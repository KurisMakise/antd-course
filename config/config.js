export default {
    singular: true,
    routes: [{
        path: "/",
        component: "../layout",
        routes: [
            {path: '/', component: './HelloWorld'},
            {path: '/HelloWorld', component: 'HelloWorld'},
            {
                path: '/dashboard/',
                routes: [
                    {path: '/dashboard/analysis', component: 'PuzzleCardsPage'},
                    {path: '/dashboard/monitor', component: 'dashboard/monitor'},
                    {path: '/dashboard/workplace', component: 'dashboard/workplace'}
                ]
            },
            {path: '/puzzleCards', component: 'PuzzleCardsPage'},
            {path: '/list', component: 'list'},
            {path: '/hello', component: 'helloWorld/index'}
        ]
    }],
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,
        }]
    ],
};

exports.routes = [
    {
        path: '/',
        component: 'app',
        routes: [
            {
                path: 'list'
            }
        ]
    },
    {
        path: '/user',
        component: 'user',
    }
];