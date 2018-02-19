const music = () => import('./music.vue');
const playlist = () => import('./playlist.vue');
const mv = () => import('./mv.vue');
const upload = () => import('./upload.vue');
const artist = () => import('./artist.vue');

export default [
    { path: 'music', component: music,
        children: [
            { path: 'playlist', component: playlist },
            { path: 'mv', component: mv },
            { path: 'upload', component: upload },
            { path: 'artist', component: artist }
        ]
    },
];
